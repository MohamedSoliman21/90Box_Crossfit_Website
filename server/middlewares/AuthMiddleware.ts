import { NextFunction, Request, Response } from 'express';
import { verify, VerifyErrors } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user: { userId: string };
}

const ValidateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const accessToken = req.header('accessToken');

  if (!accessToken) {
    return res.json({ error: 'User not logged in' });
  }

  try {
    const validToken = verify(accessToken, 'Secret') as { userId: string };

    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error as VerifyErrors });
  }
};

export default ValidateToken;
