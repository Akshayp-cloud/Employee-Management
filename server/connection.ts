import db from './postgres';

export const connectToDatabase = async (): Promise<void> => {
  try {
    await db.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Sync models with database
    await db.sync();
    console.log('✅ Models synchronized with database.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};