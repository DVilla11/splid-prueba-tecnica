import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../interfaces/sing-up';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl : string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.endpoint
  }

  addGroup(group : Group): Observable<any> {
    return this.http.post(`${this.apiUrl}api/v1/group`, group);
  }

  getInfoGroup(groupName : string): Observable<Group> {

    return this.http.get<Group>(`${this.apiUrl}api/v1/group/${groupName}`)
  }
}
