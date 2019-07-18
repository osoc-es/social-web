import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  adress = 'http://librairy.linkeddata.es/social-service/';

  constructor(private http: HttpClient) { }

  getConflictPariticipants(conflict) {
    return this.http.get(`${this.adress}users/${conflict}`);
  }

  getUserAnswers(conflict, email) {
    return this.http.get(`${this.adress}answers/${conflict}/${email}`);
  }

}
