import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/models/login';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private http: HttpClient) { }


  auth(login : LoginModel) : Observable<any> 
  {
    return this.http.post(environment.apiUrl+'authenticate', { 
      username: login.username,
      password: login.password
    }, {responseType : 'json'});
  }

}
