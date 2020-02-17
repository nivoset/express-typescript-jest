import winston from 'winston';
const metaData = {
	server: "express-server"
}

export const getLogger = (file : string) => winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	defaultMeta: { ...metaData, file: file.slice(file.lastIndexOf("/")) },
	transports: [
		new winston.transports.Console({
			level: (process.env.NODE_ENV === 'production') ? "info" : "debug",
			format: winston.format.simple()
		}),
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
	]
})