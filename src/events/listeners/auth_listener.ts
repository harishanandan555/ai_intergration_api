
import { email, exceptionEmailInfo } from '../../config'
import { EmailService } from '../../services'


export interface Exception {
	name: string
	message: string
	stack: string
	url: string
	payload: JSON
}

export interface User {
	id: number
}

export class AuthListener {

	public async sendExceptionMail(exception: Exception, ip: string, hostname: string) {

		const service = new EmailService

		return await service.send(exceptionEmailInfo.addresses.mail_to, 
			'There was an exception in API', 'EXCEPTION', `Hello there! <br/><br/> 
			Below are the exception details.<br/>
			Name : <b>${exception.name}</b><br/>
			Url : <b>${exception.url}</b><br/>
			Stack : <b>${exception.stack}</b><br/>
			Message : <b>${exception.message}</b><br/>
			payload : <b>${exception.payload}</b><br/>`);
	}

	// Store LogIn activity to the DB
	public async userLogin(user: User, ip: string, hostname: string) {
		const columns = '"id_user","date", "ip_address","host_name"'
		const values = '$1, $2, $3, $4'
		const params = [user.id, (new Date), ip, hostname]

		const type_name = 'user_logins'
		// return this.insertRow(columns, values, params)
	}

	public async forgotPassword(username: string, password: string) {
		
		const service = new EmailService

		return await service.send(username, 'You requested to change your password', 'RESET', `Hello there! <br/><br/> 
			Your request to change your password has been successfully submitted.<br/>
			The new password for your account is <b>${password}</b><br/>

			<br/><br/> <i>Need help? Contact the support team:</i>
			<br/><br/> <i>email: ${email.addresses.support}</i>`)
	}

	public async newUser(username: string) {
		const service = new EmailService;

		return await service.send(username, 'Welcome to the Website!', 'WELCOME', `Hello there! <br/><br/> 
			Your account with handle ${username} has been successfully created.<br/>

			<br/><br/> <i>Need help? Contact the support team:</i>
			<br/><br/> <i>email: ${email.addresses.support}</i>`)
	}
}

export default AuthListener
