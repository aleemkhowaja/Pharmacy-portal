import { TokenStorageService } from './../auth/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/models/login';
import { GenericService } from '../generic.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel = new LoginModel();
  serverURL: string = '';

  isloginPage : boolean = true;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private genericService: GenericService,
    private loginService: LoginService,
    private tokenStorage: TokenStorageService
  ) {
    this.serverURL = genericService.getURLServer();
  }

  ngOnInit(): void {
    localStorage.clear();
  }


  
  login(){
    this.loginService.auth(this.loginModel).subscribe(response=> {
     console.log('response ',response);
     const token = response.accessToken;
     const username = response.username;
     console.log('Tokennn ',token);
     if(token){
       localStorage.setItem("username",username);
       localStorage.setItem("token", token);
       // this.tokenStorage.saveToken(token);
       // this.tokenStorage.saveUser(username);
       this.router.navigate(['/home'], { replaceUrl: true });
     }
     else{
       this.router.navigate(['/login'], { replaceUrl: true });
     }
     
   }
   ); 
 }

  // login() {
  //   const token = '12345';
  //   const username = 'testing';
  //   localStorage.setItem('username', username);
  //   localStorage.setItem('token', token);
  //   // this.tokenStorage.saveToken(token);
  //   // this.tokenStorage.saveUser(username);
  //   this.router.navigate(['/home'], { replaceUrl: false });

  //   //  this.loginService.auth(this.loginModel).subscribe(response=> {
  //   //   console.log('response ',response);
  //   //   const token = response.accessToken;
  //   //   const username = response.username;
  //   //   console.log('Tokennn ',token);
  //   //   if(token){
  //   //     localStorage.setItem("username",username);
  //   //     localStorage.setItem("token", token);
  //   //     // this.tokenStorage.saveToken(token);
  //   //     // this.tokenStorage.saveUser(username);
  //   //     this.router.navigate(['/home'], { replaceUrl: true });
  //   //   }
  //   //   else{
  //   //     this.router.navigate(['/login'], { replaceUrl: true });
  //   //   }

  //   // }
  //   //);
  // }
  // auth(context:LoginModel): Observable<any> {
  //   return this.http.post(this.serverURL+'authenticate', {
  //     username: context.username,
  //     password: context.password
  //   }, {responseType : 'text' as 'json'});
  // }
}
