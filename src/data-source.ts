import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product";
import dotenv from 'dotenv';

dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "rjpzdrf54",
    database: "psgdb",
    synchronize: true,
    logging: false,
    entities: [User, Product],
    migrations: [],
    subscribers: [],
    ssl: false
});

const uri = process.env.DATABASE_URL;
console.log('Connecting to PostgresDB using uri:', uri)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });