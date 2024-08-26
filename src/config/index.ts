const nodemailer = require('nodemailer')
const emailTemplate = require('email-templates')

export const server = {
	port: 9000,
	apiUuid: '0eb14adc-a16e-400c-8f55-7d6c016bb36d',
	tokenExpiration: {
		days: 1,
		hours: 8,
		minutes: 0,
		seconds: 0,
	}
}

export const bcrypt = {
	saltRounds: 10,
}

export const email = {
	primary: {
		token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		from: 'api.exception@bullbox.in'
	},
	auth_smtp : {
		"service" : "gmail",
		"host" : "smtp.gmail.com",
		"secureConnection" : true,
		"port" : (587),
		"auth" : {
			"type" : "OAuth2",
			"user" : "api.exception@bullbox.in",
			"pass" : "diamonddd!@#1A"
		}
	},
	addresses: {
		support: 'api.exception@bullbox.in',
		exception: 'api.exception@bullbox.in'
	}
};

export const randomPasswordLength = 10;

export const logs = {
	maxFiles: 5,
	maxFileSize: 20971520, // 20 MB
	zipOldLogs: true
}

export const exceptionEmailInfo = {
	auth_smtp : {
		"service" : "gmail",
		"host" : "smtp.gmail.com",
		"secureConnection" : true,
		"port" : (587),
		"auth" : {
			"type" : "OAuth2",
			"user" : "api.exception@bullbox.in",
			"pass" : "diamonddd!@#1A"
		}
	},
	addresses: {
		sender: 'api.exception@bullbox.in',
		from: 'api.exception@bullbox.in',
		support: 'api.exception@bullbox.in',
		exception: 'api.exception@bullbox.in',
		mail_to: '',
		mail_cc: '',
		mail_bcc: 'senthamilan@gmail.com'
	},
	sender: {
		token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		from: 'api.exception@bullbox.in'
	},
	
};

export { config as default } from './settings'