import { DataTypes } from 'sequelize';
import sequelize from './sequelize/sequelize';

export const User = sequelize.define(
	'Users',
	{
		uuid: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		surname: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		shuffled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		wishes: {
			type: DataTypes.ARRAY(DataTypes.TEXT),
		},
	},
	{ timestamps: false },
);
