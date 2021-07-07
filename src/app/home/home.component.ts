import { CheckService } from './../common-services/islogin-service/check.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,  private checkService: CheckService) { 
  }

  ngOnInit(): void {
    let username = localStorage.getItem("username");
    if(username){
      this.checkService.isEnabled = true;
    }else{
      this.router.navigate(['/login']);
    }
  }

  logoutClicked(event: Event): void {
    localStorage.clear();
    const username =  localStorage.getItem("username");
    console.log('username ',username);
    this.checkService.isEnabled=false;
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
