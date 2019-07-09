import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AUTHService {

  Adress = 'http://librairy.linkeddata.es/social-service';

  constructor(private http: HttpClient) { }

  register(data: User) {
    return this.http.post(`${this.Adress}/users/register`, data);
  }

  login(data: User) {
    return this.http.post(`${this.Adress}/users/login`, data);
  }

  profile() {
    const email = localStorage.getItem('EMAIL');
    return this.http.get(`${this.Adress}/users/profile/${email}`);
  }
}
