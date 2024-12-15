/**
 * @mongoDB Atlas
 * connect to the DB weatherDB
 */
import mongoose from 'mongoose';
import config from '../config/default';

export async function connect(): Promise<void> {
    mongoose.set('strictQuery', true);
    const dbUri: string = config.dbUri || '';

    try {
        if (!dbUri) {
            throw new Error('Database URI is not defined in the configuration.');
        }
        await mongoose.connect(dbUri);
        console.log('Successfully connected to MongoDB Atlas!');
    } catch (error) {
        console.error('Unable to connect to MongoDB Atlas!', error);
        throw error; // זרוק שגיאה במקום להפסיק את התהליך
    }
}

