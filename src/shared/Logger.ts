/**
 * @file logger.ts
 * @application Database (IMPACT) API
 * @summary Customization for the Winston logging package
 * @description
 * This logger is a customized version for the IMPACT API, converted to TypeScript.
 * It includes a transport toggling mechanism for flexible logging options.
 *
 * The logger uses the following error severity levels from RFC5424:
 * - 0: Emergency - system is unusable
 * - 1: Alert - action must be taken immediately
 * - 2: Critical - critical conditions
 * - 3: Error - error conditions
 * - 4: Warning - warning conditions
 * - 5: Notice - normal but significant condition
 * - 6: Informational - informational messages
 * - 7: Debug - debug-level messages
 */

'use strict'

import winston, { LogEntry, createLogger, format, transports } from 'winston'
import { NextFunction } from 'express'
import chalk from 'chalk'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import onFinished from 'on-finished'
const { File, Console } = transports;

const level = process.env.LOG_LEVEL || 'debug'
const MESSAGE = Symbol.for('message')

interface CustomConsoleTransportOptions extends winston.transports.ConsoleTransportOptions {
  name: string
}

interface CustomFileTransportOptions extends winston.transports.FileTransportOptions {
  name: string
}

/**
 * Adds a timestamp to JSON formatted log entries.
 */
const jsonFormatter = (logEntry: LogEntry) => {
  const base = { timestamp: moment().toISOString() }
  return Object.assign(base, logEntry)
}

/**
 * Formats log entries for console output, mimicking the Morgan package.
 */
const consoleFormatter = (logEntry: LogEntry): LogEntry => {
  const color = logEntry.status >= 500 ? chalk.red
              : logEntry.status >= 400 ? chalk.yellow
              : logEntry.status >= 300 ? chalk.cyan
              : logEntry.status >= 200 ? chalk.green
              : chalk.white

  if (logEntry.label === 'express_request') {
    Object.assign(logEntry, {
      [MESSAGE]:
        `${moment().toISOString()} ${logEntry.req.method} ${logEntry.req.url} ` +
        `| hostname: ${logEntry.req.hostname} | ip: ${logEntry.req.ip} | origin: ${logEntry.req.origin}`,
    })
  } else if (logEntry.label === 'express_response') {
    const resp_str = color(`${logEntry.req.method} ${logEntry.req.url} (${logEntry.status}) `)
    Object.assign(logEntry, {
      [MESSAGE]:
        `${moment().toISOString()} ` +
        resp_str +
        `${logEntry.res.responseTime} ms - ${logEntry.res.contentLength} b\n\n`,
    })
    logEntry.level = 'notice'
  } else {
    Object.assign(logEntry, { [MESSAGE]: logEntry.message })
  }

  return logEntry
}

/**
 * Filters logging to specific transports based on the provided options.
 */
const filterTransport = winston.format((info, opts) => {
  // Find the transport that matches the target
  const transport = logger.transports.find((_transport: any) => _transport.name === opts.target);

  // Check if the transport is defined and cast it properly
  if (!transport) {
    // If transport is not found, return the info as is or handle the error accordingly
    return false;
  }

  // Cast transport to CustomFileTransportOptions safely
  const customTransport = transport as unknown as CustomFileTransportOptions;

  // Abort logging if the transport is not in the targets array
  const abort = Array.isArray(info.targets) &&
    !(info.targets.length === 0 || info.targets.includes('all') || info.targets.includes(customTransport.name));

  // Return the info object or false to filter out the transport
  return abort ? false : info;
});

/**
 * Create and configure the Winston logger.
 */
const logger = createLogger({
  levels: winston.config.syslog.levels, 
  level: 'info',
})

if (process.env.NODE_ENV === 'development') {
  const fileFormat = format.combine(
    format.timestamp(),
    format.json(),
  )
  
  logger.add(new File({
    filename: './logs/error.log',
    format: fileFormat,
    level: 'error',
  }))

  logger.add(new File({
    filename: './logs/combined.log',
    format: fileFormat,
  }))

} else {
  const errorStackFormat = format((info) => {
    if (info.stack) {
      console.log(info.stack)
      return false
    }
    return info
  })

  logger.add(new Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
      errorStackFormat(),
    ),
  }))
}

/**
 * Prepares log data from the request and response objects.
 */
const prepLogData = (req: any, res: any, label: any) => {
  const status = res.headersSent ? res.statusCode : undefined

  const log_data = {
    label,
    status,
    txID: req.txID,
    req: {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      hostname: req.hostname,
      ip: req.ip,
      origin: req.header('origin'),
      client: req.header('x-sbx-itt-client'),
    },
    res: {
      responseTime: res.responseTime,
      contentLength: res.getHeaders()['content-length'],
    },
  }

  if (req.sbxUser) {
    Object.assign(log_data, {
      id: req.sbxUser.id || null,
      username: req.sbxUser.username || null,
      id_org: req.sbxUser.id_org || null,
    })
  }
  return log_data
}

/**
 * Middleware to initialize request logging.
 */
const initRequest = (req: any, _res: any, next: NextFunction) => {
  req.receivedAt = process.hrtime()
  req.txID = uuidv4()
  next()
}

/**
 * Middleware to log the response.
 */
const logResponse = (req: any, res: any, next: NextFunction) => {
  onFinished(res, () => {
    if (res.statusCode !== 401) {
      res.timeDiff = process.hrtime(req.receivedAt)
      res.responseTime = ((res.timeDiff[0] * 1e9 + res.timeDiff[1]) * 1e-6).toFixed(3)
      const log_data = prepLogData(req, res, 'express_response')
      logger.notice('', log_data)
    }
  })
  next()
}

export { jsonFormatter, consoleFormatter, filterTransport, logger, initRequest, logResponse, prepLogData }
