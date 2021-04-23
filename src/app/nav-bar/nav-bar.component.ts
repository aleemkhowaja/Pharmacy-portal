import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isUserLoggedIn = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.isUserLoggedIn);
    this.isUserLoggedIn = localStorage.getItem("username") ? true : false;
    console.log(this.isUserLoggedIn);
  }

}
