import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '@/utils/cookies';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // set headers + 'fake cookie with Next.js name' (for the sake of example))
  setCookie(res, 'Next.js', 'api-middleware!', { maxAge: 1000 });

  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  res.end(res.getHeader('Set-Cookie'));
};

export default handler;
