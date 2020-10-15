import { NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from 'cookie';

export const setCookie = (
  res: NextApiResponse, // Next response extension wrapper for Express' Response
  name: string,
  value: unknown, // unknown = allows for any equality, ...
  // ... but don't allow for type-specific operations such as + etc.
  options: CookieSerializeOptions,
): void => {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;

  if ('maxAge' in options) {
    // eslint-disable-next-line no-param-reassign
    options.expires = new Date(Date.now() + options.maxAge);
    // eslint-disable-next-line no-param-reassign
    options.maxAge /= 1000; // ms to s
  }

  // set all Set-Cookies headers
  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};
