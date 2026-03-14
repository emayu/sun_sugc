import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library'

import { sequelize } from '../../config/database';
import { QueryTypes } from 'sequelize';

export class GSheeSyncService {
    static async sync() {
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
        const jwt = new JWT({
            email: process.env.SYNC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.SYNC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: SCOPES
        })
        const doc = new GoogleSpreadsheet(process.env.SYNC_GSHEET_ID!, jwt);
        await doc.loadInfo();
        console.log('Doc title:', doc.title);
        const sheet = doc.sheetsByIndex[0];

        console.log('Sheet title:', sheet.title);
        console.log('Rows count:', sheet.rowCount);

        const rows = await sheet.getRows();
        const truncateResult = await sequelize.query('truncate temp_confirmaciones');
        console.log('truncate', truncateResult);
        const skippedRows = [];
        for (let row of rows) {
            const id = parseInt(row.get('ID_INTERNO'));
            if (!id || isNaN(id)) {
                const rowSkipped = `skipped ${row.rowNumber} row`;
                skippedRows.push(rowSkipped);
                console.warn(rowSkipped);
                continue;
            }
            const insertRow = [id,
                row.get('Timestamp'),
                row.get('Email Address'),
                row.get('¿Desea participar en la Semana Informativa INFOUSAC 2026?'),
                row.get('Nombre del centro educativo'),
                row.get('Código del centro educativo ante el MINEDUC (ejemplo: 00-00-0001-01)'),
                row.get('Nombre del director(a)'),
                row.get('Número de teléfono principal'),
                row.get('Número de teléfono secundario'),
                row.get('¿Desea participar en la Semana Informativa INFOUSAC 2026?') == "Si" ? row.get('Cantidad de graduandos') : 0,
                row.get('Correo electrónico principal'),
                row.get('Correo electrónico secundario'),
                row.get('Fecha de participación'),
                row.get('Horario de participación Ma'),
                row.get('Horario de participación Mi'),
                row.get('Horario de participación J'),
                row.get('Horario de participación V'),
                row.get('¿Acompañara al grupo de estudiantes algún docente durante la actividad?'),
                row.get('Nombre completo del docente responsable del grupo de estudiantes durante la actividad.'),
                row.get('Teléfono de contacto'),
                (row.get('Confirmación correo') ? '1' : '0'),
                row.get('Observaciones')
            ];


            await sequelize.query(
                `
            INSERT INTO public.temp_confirmaciones
            (id_interno, fecha, email_response, participa, nombre_centro_educativo, codigo_mineduc, nombre_director, tel_principal, tel_secundario, cantidad_graduandos, correo_principal, correo_secundario, fecha_participacion, hora_1, hora_2, hora_3, hora_4, tiene_responsable, nombre_responsable, tel_responsable, confimacion_enviada, observaciones)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
            ;
        `,
                {
                    bind: insertRow,
                    type: QueryTypes.INSERT
                });
        }

        return {
            rowsCount: sheet.rowCount,
            skippedRows
        }
    }
}
