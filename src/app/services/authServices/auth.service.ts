import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environments.dev';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, UserLogin } from '../../common/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appUrl:string;
  private userUrl:string;
  private registerUrl:string;
  private loginUrl:string;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router


  ) {
    this.appUrl=enviroment.apiUrl;
    this.userUrl="/user";
    this.registerUrl="/save";
    this.loginUrl="/login";
  }

public register(user:User):Observable<any>{
  return this.http.post(`${this.appUrl}${this.userUrl}${this.registerUrl}`,user)
}
public login(user:UserLogin):Observable<any>{
  return this.http.post(`${this.appUrl}${this.userUrl}${this.loginUrl}`,user)
}

}
