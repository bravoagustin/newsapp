import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida en .env');
  }

  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { 
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log, 
  });

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión a PostgreSQL establecida correctamente.');
    } catch (error) {
      console.error('❌ Error al conectar a PostgreSQL:', error);
    }
  }

  testConnection();

export default sequelize;