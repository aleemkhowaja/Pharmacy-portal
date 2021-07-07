import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  isEnabled:boolean = false; 
  constructor() { }
}
