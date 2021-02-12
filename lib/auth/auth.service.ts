import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'cookie';

export const setHttpCookie = (
  req: IncomingMessage,
  res: ServerResponse,
  name: string,
  value: string,
  expirationDate?: number,
) => {
  const cookies = new Cookies(req, res);

  cookies.set(name, value, {
    sameSite: true,
    httpOnly: false,
    expires: new Date(expirationDate + 1000),
  });
};

export const getHttpCookie = (req: IncomingMessage, res: ServerResponse, name: string) => {
  const cookies = new Cookies(req, res);

  return cookies.get(name) ?? null;
};

export const deleteCookie = (req: IncomingMessage, res: ServerResponse, name: string) => {
  const cookies = new Cookies(req, res);

  cookies.set(name, '', { maxAge: -99999999 });
};

export const getDocumentCookie = (name: string) => {
  if (typeof document === 'undefined') return null;

  return parse(document.cookie)[name] ?? null;
};
