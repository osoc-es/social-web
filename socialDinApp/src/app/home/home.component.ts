import { AUTHService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AUTHService) { }

  user: User;
  hasLoaded = false;

  ngOnInit() {
    this.auth.profile().subscribe((data: User) => {
      this.user = data;
      this.hasLoaded = true;
    });
  }

}
