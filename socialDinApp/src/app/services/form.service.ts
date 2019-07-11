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

  getForm(id) {
    return this.http.get(`${this.adress}forms/${id}`);
  } // id represents the conflict id

  getQuestions(id) {
    return this.http.get(`${this.adress}questions/${id}`);
  } // id represents the form id

  postAnswers(data) {
    return this.http.post(`${this.adress}answers/submit`, data);
  }

}
