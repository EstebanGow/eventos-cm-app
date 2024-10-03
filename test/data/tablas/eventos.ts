import { IMemoryDb } from 'pg-mem';

export const eventos = {
    crear: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE public.eventos (
                        id INTEGER NOT NULL,
                        nombre TEXT NOT NULL,
                        id_direccion int4 NOT NULL,
                        fecha TEXT NOT NULL,
                        precio float NOT NULL,
                        descripcion TEXT NOT NULL,
                        tipo_evento INTEGER NOT NULL,
                        capacidad INTEGER NOT NULL,
                        hora_inicio time NOT NULL,
                        hora_fin time NOT NULL
        );`);
    },
};

export const tiposEvento = {
    crear: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE public.tipos_evento (
            id INTEGER NOT NULL,
            descripcion TEXT NOT NULL
        );`);
    },
};

export const eventosUsuarios = {
    crear: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE public.usuarios_eventos (
                            id INTEGER NOT NULL,
                            id_usuario INTEGER NOT NULL,
                            id_evento INTEGER NOT NULL

        );`);
    },
};

export const tiposUsuario = {
    crear: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE public.tipos_usuario (
                            id INTEGER NOT NULL,
                            descripcion TEXT NOT NULL
        );`);
    },
};

export const usuarios = {
    crear: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE public.usuarios (
                id INTEGER NOT NULL,
                nombres TEXT NOT NULL,
                apellidos TEXT NOT NULL,
                identificacion TEXT NOT NULL,
                telefono TEXT NOT NULL,
                tipo_usuario INTEGER NOT NULL
    );`);
    },
};

export const direcciones = {
    crear: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE public.direcciones (
            id INTEGER NOT NULL,
            pais varchar NOT NULL,
            ciudad varchar NOT NULL,
            direccion varchar NOT NULL,
            latitud varchar NULL,
            longitud varchar NULL,
            CONSTRAINT direcciones_pk PRIMARY KEY (id)
    );`);
    },
};
