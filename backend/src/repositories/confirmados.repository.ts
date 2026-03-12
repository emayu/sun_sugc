import { QueryTypes } from "sequelize";
import { sequelize } from "../config/database";
import { ConfirmacionAsistenciaDTO } from "../dtos/asistencia.dto";



export class ConfirmadosRepository{
    static findAll(){
        const query = `
        select  i.id, upper(coalesce(nullif(tc.nombre_centro_educativo, ''), i.nombre_establecimiento)) nombre_establecimiento, i.direccion, i.departamento , i.municipio,
case when tc.participa = 'No' or  i.id_estado_institucion = 8 then 'DECLINADO'
	when tc.participa = 'Si' then 'CONFIRMADO'
	else 'SIN_REGISTRO'
end as estado_participacion,
case when tc.fecha_participacion = 'Martes 17 de marzo' then '2026-03-17'
	when tc.fecha_participacion = 'Miercoles 18 de marzo' then '2026-03-18'
	when tc.fecha_participacion = 'Jueves 19 de marzo' then '2026-03-19'
	when tc.fecha_participacion = 'Viernes 20 de marzo' then '2026-03-20'
	else tc.fecha_participacion
end as fecha_participacion,
tc.fecha_participacion fecha_text,
tc.cantidad_graduandos,
coalesce(nullif(tc.hora_1, ''), nullif(tc.hora_2, ''), nullif(tc.hora_3, ''), tc.hora_4) hora_participacion,
tc.tiene_responsable, tc.nombre_responsable, tc.tel_responsable, tc.observaciones
from instituciones i 
inner join cat_estados_institucion cei on cei.id = i.id_estado_institucion 
left join temp_confirmaciones tc on tc.id_interno = i.id 
where i.id_estado_institucion is not NULL
order by fecha_participacion, hora_participacion, i.nombre_establecimiento;
        `
        return sequelize.query(query, {
            type: QueryTypes.SELECT,
            raw: true
        }) as Promise<ConfirmacionAsistenciaDTO[]>;
    }
}