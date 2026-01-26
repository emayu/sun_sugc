import { Usuario } from "./usuario.model";
import { Institucion } from "./institucion.model";
import { Bitacora } from "./bitacora.model";
import { ResultadoGestion } from "./resultadoGestion.model";
import { EstadoInstitucion } from "./estadoInstitucion.model";


Institucion.belongsTo( EstadoInstitucion, {foreignKey:'id_estado_institucion', as:'estado'});


Bitacora.belongsTo(Institucion, {foreignKey: 'id_institucion'});
Bitacora.belongsTo(ResultadoGestion, {foreignKey: 'id_resultado',  as:'resultado'})
Bitacora.belongsTo(Usuario, {foreignKey: 'id_usuario', as: 'usuario'})

export {
    Usuario,
    Institucion,
    Bitacora,
    ResultadoGestion,
    EstadoInstitucion
}