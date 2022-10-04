import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Friends } from '../interfaces/sing-up';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private apiUrl : string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.endpoint
  }

  addFriend(friend : Friends): Observable<any> {
    return this.http.post(`${this.apiUrl}api/v1/friend`, friend);
  }

}
