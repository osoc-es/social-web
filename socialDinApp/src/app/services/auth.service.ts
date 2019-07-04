import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AUTHService {

  Adress = 'localhost:3000';

  constructor(private http: HttpClient) { }

  register(data: User) {
    return this.http.post(`${this.Adress}/users/register`, data);
  }
}
