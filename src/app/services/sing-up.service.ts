import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/sing-up';

@Injectable({
  providedIn: 'root'
})
export class SingUpService {
  
  private apiUrl : string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.endpoint
  }

  singUp(user : User): Observable<any> {
    return this.http.post(`${this.apiUrl}api/v1/user/register`, user);
  }

  login(user : User){
    return this.http.post<string>(`${this.apiUrl}api/v1/user/login`, user, { observe : "response"})
  }

}
