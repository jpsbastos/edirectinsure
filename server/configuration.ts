const config = require('./config.json');

export interface IConfig {
    connectionString: string;
    port: number;
    secret: string;
}

class Configuration {
    public connectionString: string;
    public port: number;
    public secret: string;

    constructor() {
        this.connectionString = config.connectionString;
        this.port = config.port;
        this.secret = config.secret;
    }
}

export const configuration = new Configuration();