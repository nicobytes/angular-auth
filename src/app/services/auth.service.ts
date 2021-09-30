import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { TokenService } from './token.service';
import { User, LoginRta } from './../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  login(email: string, password: string) {
    const url = `${environment.API_URL}/auth/login`;
    return this.http.post<LoginRta>(url, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile(){
    const url = `${environment.API_URL}/auth/profile`;
    return this.http.get<User>(url);
    // const token = this.tokenService.getToken();
    // return this.http.get<User>(url, {
    //   headers: {
    //     'Authorization': ` Bearer ${token}`
    //   }
    // });
  }

  logout() {
    this.tokenService.clearToken();
  }
}
