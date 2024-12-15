"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
/**
 * @mongoDB Atlas
 * connect to the DB weatherDB
 */
const mongoose_1 = __importDefault(require("mongoose"));
const default_1 = __importDefault(require("../config/default"));
async function connect() {
    mongoose_1.default.set('strictQuery', true);
    const dbUri = default_1.default.dbUri || '';
    try {
        if (!dbUri) {
            throw new Error('Database URI is not defined in the configuration.');
        }
        await mongoose_1.default.connect(dbUri);
        console.log('Successfully connected to MongoDB Atlas!');
    }
    catch (error) {
        console.error('Unable to connect to MongoDB Atlas!', error);
        throw error; // זרוק שגיאה במקום להפסיק את התהליך
    }
}
