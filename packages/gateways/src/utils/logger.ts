export class Logger {
  static info(message: string, ...optionalParams: any[]) {
    console.info(`[INFO]: ${message}`, ...optionalParams)
  }

  static error(message: string, ...optionalParams: any[]) {
    console.error(`[ERROR]: ${message}`, ...optionalParams)
  }

  static debug(message: string, ...optionalParams: any[]) {
    console.debug(`[DEBUG]: ${message}`, ...optionalParams)
  }
}
