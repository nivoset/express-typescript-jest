import winston from 'winston';
import expressWinston from "express-winston";
const metaData = {
	server: "express-server"
}

export const getLogger = (name : string) => winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	defaultMeta: { ...metaData, name },
	transports: [
		new winston.transports.Console({
			level: (process.env.NODE_ENV === 'production') ? "info" : "debug",
			format: winston.format.simple()
		}),
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
	]
})

export const routeLogging = expressWinston.logger({
	transports: [
	  new winston.transports.Console()
	],
	format: winston.format.combine(
	//   winston.format.colorize(),
	  winston.format.json()
	),
	meta: (process.env.NODE_ENV !== 'production'), // optional: control whether you want to log the meta data about the request (default to true)
	msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
	expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
	colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
	ignoreRoute (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});