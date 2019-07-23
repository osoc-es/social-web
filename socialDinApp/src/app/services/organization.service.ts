import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  Adress = 'http://librairy.linkeddata.es/social-service/';

  constructor(private http: HttpClient) { }

  getOrganizationList() {
    return this.http.get(`${this.Adress}organizations`);
  }
}
