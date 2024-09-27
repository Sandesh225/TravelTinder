import winston from 'winston';

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info', // Set default log level to 'info'
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Log messages in JSON format
  ),
  transports: [
    // Output errors to the console during development
    new winston.transports.Console({
      format: winston.format.simple(),
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    }),

    // Log errors to a file in production
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Export the logger instance for use in other parts of the app
export { logger };
