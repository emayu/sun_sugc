import { Sequelize } from 'sequelize';

const getOffset = () => {
  const tz = process.env['TZ'] || 'UTC';
  const date = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    timeZoneName: 'shortOffset'
  }).formatToParts(date);
  
  const offsetTimeZone = parts.find(p => p.type === 'timeZoneName')?.value;
  const offset = offsetTimeZone ? offsetTimeZone.replace('GMT', '') + ':00' : '+00:00';
  console.log('Sequelize offset:', offset);
  return offset;
};


export const sequelize = new Sequelize(
  process.env.DB_NAME || 'sugc',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'host.docker.internal',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    timezone: getOffset(),
    logging: process.env.ENV === 'DEV' ? console.log : false,
    define:{
        freezeTableName: true
    }
  }
);