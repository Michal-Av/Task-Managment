// config/default.ts

interface Config {
    port: number;
    protocol: string;
    host: string;
    origin: string;
    secretKey: string;
    dbUri?: string; // Make this optional as it's derived from an environment variable
}

const config: Config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
    protocol: "http",
    host: "localhost",
    origin: "https://localhost:4000",
    secretKey: "YElq5hKf8vjohgCQ",
    dbUri: "mongodb+srv://tasksApp:YElq5hKf8vjohgCQ@cluster0.et8rk.mongodb.net/tempDB?retryWrites=true&w=majority"
};

export default config;
