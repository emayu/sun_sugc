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
    descripcion VARCHAR(250)
);

-- 2. Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    roles VARCHAR(20) DEFAULT 'agente', -- 'admin' o 'agente'
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
    id_estado_inst INTEGER REFERENCES cat_estados_institucion(id),
    id_responsable INTEGER REFERENCES usuarios(id),
    ultima_gestion_at TIMESTAMP,
    estado_mineduc VARCHAR(50),

    -- Contactos Originales
    tel_1 VARCHAR(20),
    estado_t1 VARCHAR(50),
    tel_2 VARCHAR(20),
    estado_t2 VARCHAR(50),
    email_1 VARCHAR(100),
    estado_e1 VARCHAR(50),
    email_2 VARCHAR(100),
    estado_e2 VARCHAR(50),

    -- Campos Nuevos para investigaciones
    tel_nuevo_1 VARCHAR(20),
    estado_tn1 VARCHAR(50),
    tel_nuevo_2 VARCHAR(20),
    estado_tn2 VARCHAR(50),
    tel_nuevo_3 VARCHAR(20),
    estado_tn3 VARCHAR(50)
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