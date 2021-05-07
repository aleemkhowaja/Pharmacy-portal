import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logoutClicked(event: Event): void {
    localStorage.clear();
    const username =  localStorage.getItem("username");
    console.log('username ',username);

    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
