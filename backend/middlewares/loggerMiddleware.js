import morgan from "morgan";
import logger from "../utils/logger.js";

// HTTP isteklerini loglama
const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }
);

export { requestLogger };
