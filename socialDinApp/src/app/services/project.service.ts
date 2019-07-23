import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  Adress = 'http://librairy.linkeddata.es/social-service/';

  constructor(private http: HttpClient) { }

  getProjects() {
    const orgId = localStorage.getItem('ORG_ID');
    return this.http.get(`${this.Adress}projects/${orgId}`);
  }

  getProjectsAndConflicts() {
    const orgId = localStorage.getItem('ORG_ID');
    return this.http.get(`${this.Adress}projects/projectconflicts/${orgId}`);
  }

  getConflicts() {
    return this.http.get(`${this.Adress}conflicts/`);
  }

  createProject(body) {
    const orgId = localStorage.getItem('ORG_ID');
    return this.http.post(`${this.Adress}projects/add/${orgId}`, body);
  }

  createConflict(body) {
    return this.http.post(`${this.Adress}conflicts/add/`, body);
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

  addConflictToProject(projectId, conflictId) {
    return this.http.post(`${this.Adress}projects/add/${projectId}/${conflictId}`, {});
  }
}
