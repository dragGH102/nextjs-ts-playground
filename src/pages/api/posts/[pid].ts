// include typings
import * as express from 'express';

// NOTE: catch all routes supported same way as client-side catch all routes
// ("pid" will be treated the same way as router.query where router = useRouter)
// ref: https://nextjs.org/docs/api-routes/dynamic-api-routes#optional-catch-all-api-routes

export default function handler(req: express.Request, res: express.Response) {
  const {
    method,
    query: { pid },
  } = req;

  if (method === 'GET') {
    if (pid) {
      res.statusCode = 200;
      res.end(`Post: ${pid}`);
    } else {
      try {
        const error = 'No post id specified';
        throw new Error(error);
      } catch (err) {
        res.statusCode = 400;
        res.end(`error: ${err}`);
      }
    }
  } else {
    const error = `unsupported method ${method}`;
    try {
      throw new Error(error);
    } catch (err) {
      res.statusCode = 400;
      res.end(`error: ${err}`);
    }
  }
}
