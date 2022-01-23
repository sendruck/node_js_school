import { DataTypes } from 'sequelize';
import sequelize from './sequelize/sequelize';

export const Presenter = sequelize.define(
	'Presenters',
	{
		recepient_id: {
			type: DataTypes.INTEGER,
		},
	},
	{ timestamps: false },
);
