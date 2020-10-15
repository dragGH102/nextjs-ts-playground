// include typings
// eslint-disable-next-line import/no-unresolved
import * as express from 'express';

import Cors from 'cors';

// NOTE: catch all routes supported same way as client-side catch all routes
// ("pid" will be treated the same way as router.query where router = useRouter)
// ref: https://nextjs.org/docs/api-routes/dynamic-api-routes#optional-catch-all-api-routes

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// handle eventual cors errors
function corsMiddleware(
  req: express.Request,
  res: express.Response,
  fn: Function,
): any {
  // actual return type: https://stackoverflow.com/a/44417300/1219368
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  await corsMiddleware(req, res, cors);

  // console.log(req.cookies);
  // console.log(req.query);
  // console.log(req.body);

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

// route config
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
