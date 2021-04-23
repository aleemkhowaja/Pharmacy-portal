import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  url = '';

  constructor() {}

  getURLServer(): string {
    return (this.url = 'http://localhost:6199/');
  }
}
