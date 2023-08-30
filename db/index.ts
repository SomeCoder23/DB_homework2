import { DataSource } from "typeorm"
import { User } from "./entity/User.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hw_db',
    entities: [User],
    synchronize: true
}
);

const initialize = () => { dataSource.initialize().then(() => {
    console.log("Connected to DB!");
}). catch(err => {
    console.error("Failed to connect to db " + err);
})}

export default { initialize, dataSource};