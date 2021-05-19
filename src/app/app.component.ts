import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pharmacy-portal';

  isLoggedIn$: string | null | undefined;
  
  constructor( private router: Router) { }

  ngOnInit(): void {
    let username = localStorage.getItem("username");
    this.isLoggedIn$ = username;

    console.log(this.isLoggedIn$);

    // if(username)
    //   this.router.navigate(['/home'], { replaceUrl: true });
  }

}
