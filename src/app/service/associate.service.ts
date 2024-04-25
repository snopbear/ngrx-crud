import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associates } from '../store/model/associate.model';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  baseUrl = 'http://localhost:3000/associate';
  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<Associates[]>(this.baseUrl);
  }

  GetByCode(code: number) {
    return this.http.get<Associates>(this.baseUrl + '/' + code);
  }

  Delete(code: number) {
    return this.http.delete<Associates>(this.baseUrl + '/' + code);
  }
  Update(data: Associates) {
    return this.http.put(this.baseUrl + '/' + data.id, data);
  }
  Create(data: Associates) {
    return this.http.post(this.baseUrl , data);
  }
}
