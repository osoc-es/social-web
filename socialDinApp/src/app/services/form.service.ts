import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  adress = 'http://librairy.linkeddata.es/social-service/';

  constructor(private http: HttpClient) { }

  getProjects() {
    const orgId = localStorage.getItem('ORG_ID');
    return this.http.get(`${this.adress}projects/${orgId}`);
  }

  getConflicts(projectId) {
    return this.http.get(`${this.adress}conflicts/${projectId}`);
  }

  getForm(id) {
    return this.http.get(`${this.adress}forms/${id}`);
  } // id represents the conflict id

  getQuestions(id) {
    return this.http.get(`${this.adress}questions/${id}`);
  } // id represents the form id

  postAnswers(array) {
    return this.http.post(`${this.adress}answers/submit`, {
      data: array
    });
  }

}
