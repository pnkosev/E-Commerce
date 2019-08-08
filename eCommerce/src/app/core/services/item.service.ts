import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Item } from '../models/item';

const baseURL = `${environment.ApiURL}/item`;

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(
    private http: HttpClient
  ) { }

  createItem(payload: Item): Observable<object> {
    return this.http.post(`${baseURL}/create`, payload);
  }

  getApprovedItems(): Observable<object> {
    return this.http.get<Item[]>(`${baseURL}/allApproved`);
  }
}
