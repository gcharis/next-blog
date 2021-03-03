import axios from 'axios';
import { setHttpCookie } from '../../lib/auth/auth.service';
import { resolveUrl } from '../../lib/config';

export default async (req: any, res: any) => {
  const API_URL = resolveUrl();

  try {
    const {
      data: {
        jwt,
        user: { username },
      },
    } = await axios.post(`${API_URL}/auth/local`, req.body);

    const {
      data: { exp, id },
    } = await axios.post(`${API_URL}/verify-token`, { token: jwt });

    setHttpCookie(req, res, 'auth', jwt, exp * 1000);
    setHttpCookie(req, res, 'uid', id, exp * 1000);
    setHttpCookie(req, res, 'username', username, exp * 1000);

    res.send('ok');
  } catch (e) {
    console.log(e.message);
    res.status(400).send('nok');
  }
};
