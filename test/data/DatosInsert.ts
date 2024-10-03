import { IMemoryDb, newDb } from 'pg-mem';
import { eventos, usuarios, tiposEvento, tiposUsuario, direcciones, eventosUsuarios } from './tablas';

export const eventosDatabase = (db?: IMemoryDb) => {
    const dbmem = db ?? newDb();
    eventos.crear(dbmem);
    dbmem.public
        .none(`INSERT INTO public.eventos (id, nombre,id_direccion,fecha,precio,descripcion,tipo_evento,capacidad,hora_inicio,hora_fin) VALUES
	        (1,'Dia de Campo',1,'2024-09-12',100000.0,'Salida de campo',1,50,'10:00:00','17:00:00');`);

    usuarios.crear(dbmem);
    dbmem.public.none(
        `INSERT INTO public.usuarios (id, nombres,apellidos,identificacion,telefono,tipo_usuario) VALUES
	        (1, 'Oscar','Hernandez Lopez','4332223','3128656451',2);`,
    );

    tiposEvento.crear(dbmem);
    dbmem.public.none(
        `INSERT INTO public.tipos_evento (id,descripcion) VALUES
	        (1,'Abierto')`,
    );
    dbmem.public.none(`INSERT INTO public.tipos_evento (id,descripcion) VALUES
                        (2,'VIP');
    `);

    tiposUsuario.crear(dbmem);
    dbmem.public.none(
        `INSERT INTO public.tipos_usuario (id,descripcion) VALUES
	    (1,'Estandar');`,
    );
    dbmem.public.none(
        `INSERT INTO public.tipos_usuario (id,descripcion) VALUES
	    (2,'VIP');`,
    );

    direcciones.crear(dbmem);
    dbmem.public.none(
        `INSERT INTO public.direcciones (id, pais,ciudad,direccion,latitud,longitud) VALUES
	 (1,'Colombia','Bello','Calle 20E # 73 71','7.886826','-72.484806');`,
    );

    eventosUsuarios.crear(dbmem);
    dbmem.public.none(`INSERT INTO public.usuarios_eventos (id, id_usuario, id_evento) VALUES(1, 1, 1);`);
    return dbmem;
};
