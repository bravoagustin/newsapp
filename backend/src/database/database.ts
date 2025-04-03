import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
if (!process.env.DATABASE_PUBLIC_URL) {
    throw new Error('DATABASE_URL no está definida en .env');
  }

  const sequelize = new Sequelize(process.env.DATABASE_PUBLIC_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { // Obligatorio para Railway
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log, // Opcional: muestra queries SQL en consola
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