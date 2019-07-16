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

  createForm(body, conflictId) {
    return this.http.post(`${this.Adress}forms/add/${conflictId}`, body);
  }

  getForms(conflictId) {
    return this.http.get(`${this.Adress}forms/${conflictId}`);
  }

  getQuestions(formId) {
    return this.http.get(`${this.Adress}questions/${formId}`);
  }

  addQuestion(body, formId) {
    return this.http.post(`${this.Adress}questions/add/${formId}`, body);
  }
}
