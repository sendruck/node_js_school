import { Sequelize } from 'sequelize';
import path from 'path';

const dbFilePath = path.join(__dirname, '../../../local_DB/ForeignKeyDB');
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: dbFilePath,
});

export default sequelize;
