import { IEditarEvento, IEvento } from '@application/data';
import { TiposEvento, TiposUsuaario } from '@domain/enum';
import { BadMessageException } from '@domain/exceptions';
import moment from 'moment-timezone';

export const validarPermisosEventoUsuario = (usuario: any, evento: any) => {
    validarExistenciaEvento(evento);
    validarExistenciaUsuario(usuario);

    const existeUsuario = evento[0].usuarios.filter((u: any) => u.identificacion === usuario[0].identificacion);
    if (existeUsuario.length) {
        throw new BadMessageException(
            'Error asociar usuario evento',
            `El usuario ${usuario[0].identificacion} ya se encuentra registrado al evento ${evento[0].nombre}`,
        );
    }

    if (evento[0].tipo_evento.id === TiposEvento.VIP) {
        if (usuario[0].tipo_usuario.id !== TiposUsuaario.VIP) {
            throw new BadMessageException(
                'Error asociar usuario evento',
                `El usuario no tiene permisos para asistir al evento VIP`,
            );
        }
    }
};

export const validarCapacidadEvento = (evento: any) => {
    if (evento[0].usuarios_inscritos < evento[0].capacidad) {
        return true;
    }
    throw new BadMessageException(
        'Error asociar usuario evento',
        `El evento no tiene capacidad, total asistentes: ${evento[0].capacidad}`,
    );
};

export const validarCreacionEvento = (evento: IEvento) => {
    const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm');
    const fechaEvento = moment(`${evento.fecha} ${evento.horaInicio}`).format('YYYY-MM-DD HH:mm');
    if (fechaActual > fechaEvento) {
        throw new BadMessageException(
            'Error creacion evento',
            `la fecha del evento no puede ser menor a la fecha actual`,
        );
    }
};

export const validarEdicionEvento = (eventoEditar: IEditarEvento, evento: any) => {
    validarExistenciaEvento(evento);
    const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
    const fechaEventoActual = moment(`${evento[0].fecha} ${evento[0].hora_inicio}`).format('YYYY-MM-DD HH:mm:ss');
    const nuevaFechaEvento = moment(`${eventoEditar.fecha} ${eventoEditar.horaInicio}`).format('YYYY-MM-DD HH:mm:ss');
    if (fechaEventoActual < fechaActual) {
        throw new BadMessageException('Error edicion evento', `No se puede editar un evento que ya paso`);
    }
    if (fechaActual > nuevaFechaEvento) {
        throw new BadMessageException(
            'Error edicion evento',
            `la fecha del evento no puede ser menor a la fecha actual`,
        );
    }
};

const validarExistenciaEvento = (evento: any) => {
    if (!evento.length) {
        throw new BadMessageException('Error', `No existe el evento enviado`);
    }
};

const validarExistenciaUsuario = (usuario: any) => {
    if (!usuario.length) {
        throw new BadMessageException('Error', `No existe el usuario enviado`);
    }
};

function obtenerDiaSemana(fecha: string) {
    const date = new Date(fecha);
    const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    return diaSemana[date.getDay()];
}

export const calcularAsistentes = (eventos: any) => {
    const asistentesPorDia: any = {};
    eventos.forEach((evento: any) => {
        const diaSemana = obtenerDiaSemana(evento.fecha);
        if (!asistentesPorDia[diaSemana]) {
            asistentesPorDia[diaSemana] = 0;
        }
        asistentesPorDia[diaSemana] += evento.usuarios_inscritos;
    });

    return asistentesPorDia;
};
