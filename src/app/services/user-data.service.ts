import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/sing-up';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl : string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.endpoint
  }

  getData(username : string): Observable<User> {

    return this.http.get<User>(`${this.apiUrl}api/v1/user/${username}`)
  }
}
