import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from './user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Yetkisiz erişim' });
    }

    try {
      const decoded = jwt.verify(token, 'gizli-anahtar') as User;
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Geçersiz token' });
    }
  }
}
