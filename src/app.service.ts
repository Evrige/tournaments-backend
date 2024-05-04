import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getUsers(){
    return [{ name: 'Arturo', age: 21}];
  }
}
