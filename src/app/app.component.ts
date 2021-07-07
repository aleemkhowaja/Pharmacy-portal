import { CheckService } from './common-services/islogin-service/check.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pharmacy-portal';

  isLoggedIn$: string | null | undefined;
  
  constructor( private router: Router, public checkService: CheckService) {
   }

  ngOnInit(): void {
    let username = localStorage.getItem("username");
    if(username){
      this.checkService.isEnabled = true;
    }else{
      this.router.navigate(['/login']);
    }
    console.log(this.isLoggedIn$);

  }

}
