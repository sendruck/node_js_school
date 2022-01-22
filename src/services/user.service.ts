import { Service, Inject } from 'typedi';

@Service()
export default class UserService {
	constructor(@Inject('logger') private logger) {}

	public async AddUser(userInput: any): Promise<{ data: any }> {
		//this.logger.info('User service: Adding user');

		try {
			return { data: userInput };
		} catch (error) {
			//this.logger.error(`Error Adding User: ${error}`);
			throw error;
		}
	}
}
