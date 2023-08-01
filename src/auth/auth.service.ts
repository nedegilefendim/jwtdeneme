import { Injectable } from '@nestjs/common';
@Injectable({})
export class AuthService {
  signin() {
    return { msg: 'Hello betul' };
  }
  signup() {
    return { msg: 'nabıyon' };
  }
}
