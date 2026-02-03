select íd from cat_estados_institucion cei 
where nombre = '07-Confirmado';

-- insertar para institutos confirmados
INSERT INTO bitacora_gestiones (
    id_institucion, 
    id_usuario, 
    fecha_gestion_inicio, 
    fecha_gestion_final, 
    accion, 
    medio_contacto, 
    id_resultado, 
    observaciones
)
SELECT 
    id,                         -- Toma el ID de cada institución
    1,                          -- ID del usuario (asumiendo que tú o el admin es el 1)
    '2025-01-27 12:23:00',          -- Fecha inicio
    '2025-01-27 12:23:00',          -- Fecha fin
    'ENVÍO EMAIL',     -- Acción realizada
    'EMAIL',                    -- Medio
    10,                         -- El ID nuevo envio de sistema
    'Contacto inicial: Envío de correo invitación (Envío Masivo desde <infousac@adm.usac.edu.gt>).'
FROM instituciones i
where i.id_estado_institucion = 7;

-- insertar para institutos no confirmados
INSERT INTO bitacora_gestiones (
    id_institucion, 
    id_usuario, 
    fecha_gestion_inicio, 
    fecha_gestion_final, 
    accion, 
    medio_contacto, 
    id_resultado, 
    observaciones
)
SELECT 
    id,                         -- Toma el ID de cada institución
    1,                          -- ID del usuario (asumiendo que tú o el admin es el 1)
    '2025-01-27 12:23:00',          -- Fecha inicio
    '2025-01-27 12:23:00',          -- Fecha fin
    'ENVÍO EMAIL',     -- Acción realizada
    'EMAIL',                    -- Medio
    10,                         -- El ID nuevo envio de sistema
    'Contacto inicial: Envío de correo invitación (Envío Masivo desde <infousac@adm.usac.edu.gt>). Institución sin respuesta registrada; se debe dar seguimiento telefónico.'
FROM instituciones i
where i.id_estado_institucion != 7;