import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSiblingService {

  private messageSource = new BehaviorSubject<string>("")
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  setUsername(username : string){
    this.messageSource.next(username);
  }

}
