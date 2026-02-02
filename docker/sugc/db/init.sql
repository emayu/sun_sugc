create database sugc template template0;

\connect sugc

CREATE TABLE cat_estados_institucion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT null, -- 01-Pendiente, 02-En proceso...
    descripcion VARCHAR(250)
);

CREATE TABLE cat_resultados_gestion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT null, -- Contacto exitoso, No contestan...
    tipo VARCHAR(30),
    descripcion VARCHAR(250)
);

-- 2. Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    roles VARCHAR(20) DEFAULT 'usuario', -- 'admin' o 'usuario'
    configuracion JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT unique_email UNIQUE (email) 
);

-- 3. Instituciones (La "DB" principal)
CREATE TABLE instituciones (
    id SERIAL PRIMARY KEY,
    codigo_mineduc VARCHAR(50),
    distrito VARCHAR(50),
    departamento VARCHAR(100),
    municipio VARCHAR(100),
    nombre_establecimiento VARCHAR(200) NOT NULL,
    direccion VARCHAR(250),
    sector VARCHAR(50),
    nivel VARCHAR(50),
    jornada VARCHAR(50),
    plan VARCHAR(50),
    cantidad_graduandos INTEGER DEFAULT 0,
    supervisor VARCHAR(100),
    director VARCHAR(100),
    contacto_alterno VARCHAR(100),
    
    -- Estados y Control
    id_estado_institucion INTEGER REFERENCES cat_estados_institucion(id),
    id_responsable INTEGER REFERENCES usuarios(id),
    ultima_gestion_at TIMESTAMP WITH TIME ZONE,
    estado_mineduc VARCHAR(50),

    -- Contactos Originales
    tel_1 VARCHAR(20),
    estado_tel_1 VARCHAR(50),
    tel_2 VARCHAR(20),
    estado_tel_2 VARCHAR(50),
    email_1 VARCHAR(100),
    estado_email_1 VARCHAR(50),
    email_2 VARCHAR(100),
    estado_email_2 VARCHAR(50),

    -- Campos Nuevos para investigaciones
    tel_nuevo_1 VARCHAR(20),
    estado_tel_nuevo_1 VARCHAR(50),
    tel_nuevo_2 VARCHAR(20),
    estado_tel_nuevo_2 VARCHAR(50),
    tel_nuevo_3 VARCHAR(20),
    estado_tel_nuevo_3 VARCHAR(50)
);

-- 4. Bitácora de Llamadas/Gestiones
CREATE TABLE bitacora_gestiones (
    id SERIAL PRIMARY KEY,
    id_institucion INTEGER REFERENCES instituciones(id),
    id_usuario INTEGER REFERENCES usuarios(id),
    fecha_gestion_inicio timestamp with time zone not null,
    fecha_gestion_final timestamp with time zone DEFAULT now(),
    accion VARCHAR(50), -- Llamada T1, WhatsApp, etc.
    medio_contacto VARCHAR(50), -- 'Teléfono 1', 'Teléfono Nuevo 2', etc.
    id_resultado INTEGER REFERENCES cat_resultados_gestion(id),
    observaciones TEXT,
    proxima_llamada timestamp with time zone 
);


insert into usuarios(nombre, email, password_hash) values ('usuario', 'usuario', '$2b$10$eXUQxwsPGOLIwdpGmCK9te4ILPDeVuS/sgtuGjcEgzmXG1qf2NQ1q');


INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Contacto exitoso','LLAMADA');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('No contestan','LLAMADA');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Línea dañada','LLAMADA');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Número Equivocado','LLAMADA');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Fuera de servicio','LLAMADA');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Pidió re-llamar después','LLAMADA');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Buzón de voz','LLAMADA');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Dato encontrado','INVESTIGACION');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Datos no encontrados','INVESTIGACION');
INSERT INTO cat_resultados_gestion (nombre,tipo) VALUES ('Correo enviado','SISTEMA');

INSERT INTO cat_estados_institucion (id, nombre, descripcion) VALUES(1, '01-Pendiente', 'Estado inicial');
INSERT INTO cat_estados_institucion (id, nombre, descripcion) VALUES(2, '02-En proceso', 'Proceso de llamadas iniciado');
INSERT INTO cat_estados_institucion (id, nombre, descripcion) VALUES(3, '03-Seguimiento Pendiente', NULL);
INSERT INTO cat_estados_institucion (id, nombre, descripcion) VALUES(4, '04-Llamada programada', 'Se debe llamar a la hora indicada');
INSERT INTO cat_estados_institucion (id, nombre, descripcion) VALUES(5, '05-Investigación', 'Se encuentra en búsqueda de información por internet');
INSERT INTO cat_estados_institucion (id, nombre, descripcion) VALUES(6, '06-Invitación Enviada', 'Ya se envió la invitación');
INSERT INTO cat_estados_institucion (id, nombre, descripcion) VALUES(7, '07-Confirmado', NULL);
INSERT INTO cat_estados_institucion (id, nombre, descripcion) VALUES(8, '08-Declinado', NULL);


select * from cat_estados_institucion cei order by nombre;