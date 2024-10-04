import { IEditarEvento, IEvento } from '@application/data';
import { IEventoOut } from '@application/data/out/IEventoOut';
import { TiposEvento, TiposUsuaario } from '@domain/enum';
import {
    ApiRestException,
    ERROR_ASOCIAR_EVENTO_USUARIO,
    ERROR_CREACION_EVENTO,
    ERROR_EDICION_EVENTO,
} from '@domain/exceptions';
import { UsuarioModel } from '@domain/model';
import moment from 'moment-timezone';

export const validarPermisosEventoUsuario = (usuario: UsuarioModel, evento: IEventoOut) => {
    validarExistenciaEvento(evento);
    validarExistenciaUsuario(usuario);

    const existeUsuario = evento.usuarios.filter((u: any) => u.identificacion === usuario.identificacion);
    if (existeUsuario.length) {
        throw new ApiRestException(
            ERROR_ASOCIAR_EVENTO_USUARIO,
            `El usuario ${usuario.identificacion} ya se encuentra registrado al evento ${evento.nombre}`,
        );
    }

    if (evento.tipo_evento.id === TiposEvento.VIP) {
        if (usuario.tipo_usuario.id !== TiposUsuaario.VIP) {
            throw new ApiRestException(
                ERROR_ASOCIAR_EVENTO_USUARIO,
                `El usuario no tiene permisos para asistir al evento VIP`,
            );
        }
    }
};

export const validarCapacidadEvento = (evento: IEventoOut) => {
    if (evento.usuarios_inscritos < evento.capacidad) {
        return true;
    }
    throw new ApiRestException(
        ERROR_ASOCIAR_EVENTO_USUARIO,
        `El evento no tiene capacidad, total asistentes: ${evento.capacidad}`,
    );
};

export const validarCreacionEvento = (evento: IEvento) => {
    const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm');
    const fechaEvento = moment(`${evento.fecha} ${evento.horaInicio}`).format('YYYY-MM-DD HH:mm');
    if (fechaActual > fechaEvento) {
        throw new ApiRestException(ERROR_CREACION_EVENTO, `la fecha del evento no puede ser menor a la fecha actual`);
    }
};

export const validarCreacionEventoImportacion = (evento: IEvento) => {
    const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm');
    const fechaEvento = moment(`${evento.fecha} ${evento.horaInicio}`).format('YYYY-MM-DD HH:mm');
    if (fechaActual > fechaEvento) {
        return { error: true, mensaje: 'la fecha del evento no puede ser menor a la fecha actual' };
    }
    return { error: false };
};

export const validarEdicionEvento = (eventoEditar: IEditarEvento, evento: IEventoOut) => {
    validarExistenciaEvento(evento);
    const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
    const fechaEventoActual = moment(`${evento.fecha} ${evento.hora_inicio}`).format('YYYY-MM-DD HH:mm:ss');
    const nuevaFechaEvento = moment(`${eventoEditar.fecha} ${eventoEditar.horaInicio}`).format('YYYY-MM-DD HH:mm:ss');
    if (fechaEventoActual < fechaActual) {
        throw new ApiRestException('Error edicion evento', `No se puede editar un evento que ya paso`);
    }
    if (fechaActual > nuevaFechaEvento) {
        throw new ApiRestException(ERROR_EDICION_EVENTO, `la fecha del evento no puede ser menor a la fecha actual`);
    }
};

export const validarExistenciaEvento = (evento: IEventoOut) => {
    if (!evento) {
        throw new ApiRestException('Error', `No existe el evento enviado`);
    }
};

export const validarExistenciaUsuario = (usuario: UsuarioModel) => {
    if (!usuario) {
        throw new ApiRestException('Error', `No existe el usuario enviado`);
    }
};

export function obtenerDiaSemana(fecha: string) {
    const date = new Date(fecha);
    const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    return diaSemana[date.getDay()];
}

export const calcularAsistentes = (eventos: any) => {
    const asistentesPorDia: any = {};
    let totalUsuarios = 0;
    eventos.forEach((evento: any) => {
        const diaSemana = obtenerDiaSemana(evento.fecha);
        if (!asistentesPorDia[diaSemana]) {
            asistentesPorDia[diaSemana] = 0;
        }
        asistentesPorDia[diaSemana] += evento.usuarios_inscritos;
        totalUsuarios += evento.usuarios_inscritos;
    });

    return { asistentesPorDia, totalUsuarios };
};
