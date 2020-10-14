import * as express from 'express';

export default function handler(req: express.Request, res: express.Response) {
  const { method } = req;

  if (method === 'GET') {
    res.end('No post id has been defined');
  } else {
    // TODO:  this can be a handled in a separated file
    const error = `unsupported method ${method}`;
    try {
      throw new Error(error);
    } catch (err) {
      res.statusCode = 400;
      res.end(`error: ${err}`);
    }
  }
}
