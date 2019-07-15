import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  Adress = 'http://librairy.linkeddata.es/social-service/';

  constructor(private http: HttpClient) { }

  getProjects(id) {
    return this.http.get(`${this.Adress}projects/${id}`);
  }
}
