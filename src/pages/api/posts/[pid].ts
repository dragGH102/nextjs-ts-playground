// include typings
import * as express from 'express';

export default function handler(req: express.Request, res: express.Response) {
  const {
    method,
    query: { pid },
  } = req;

  console.log(method);
  if (method === 'GET') {
    res.end(`Post: ${pid}`);
  } else {
    const error = `unsupported method ${method}`;
    try {
      throw new Error(error);
    } catch (err) {
      res.end(`error: ${err}`);
    }
  }
}
