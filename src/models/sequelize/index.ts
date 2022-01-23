import sequelize from './sequelize';
import { applyExtraSetup } from './applyExtraSetup';

applyExtraSetup();

export default sequelize;
