import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  adress = 'http://librairy.linkeddata.es/social-service/';

  constructor(private http: HttpClient) { }

  getConflicts() {
    return this.http.get(`${this.adress}conflicts`);
  }

}
