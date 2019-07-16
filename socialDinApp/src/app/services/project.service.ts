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

  getConflicts(projectId) {
    return this.http.get(`${this.Adress}conflicts/${projectId}`);
  }

  createProject(body, orgId) {
    return this.http.post(`${this.Adress}projects/add/${orgId}`, body);
  }

  createConflict(body, projectId) {
    return this.http.post(`${this.Adress}conflicts/add/${projectId}`, body);
  }
}
