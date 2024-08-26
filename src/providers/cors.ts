
import { NextFunction, Response, Request } from 'express'

import {logger, prepLogData} from '../shared/Logger'

class CORS {

  private static allowedOrigins = ['https://bullboxconnect.onrender.com', 'http://bullboxconnect.onrender.com',"https://localhost:3000","http://localhost:3000", "https://localhost:8000","http://localhost:8000"];

  public static handle(req: Request, res: Response, next: NextFunction) {

    const origin = req.get('Origin');

    if (origin && CORS.allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, SH-Request-ID, SH-Additional-Params, qmetrix-token');

    if (req.method == 'OPTIONS') {
      logger.notice('', prepLogData(req, res, 'express_request'));
      return res.status(200).json({ result: 'success' });
    } else {
      return next()
    }

  }

}

export default CORS

