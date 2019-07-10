import { Router } from '@angular/router';
import { Conflict } from './../interfaces/conflict';
import { AUTHService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AUTHService, private dinapp: FormService, private router: Router) { }

  user: User;
  hasLoaded = false;

  problems: [Conflict];

  loadData() {
    this.dinapp.getConflicts().subscribe((data: [Conflict]) => {
      this.problems = data;
    });
  }

  logOut() {
    localStorage.removeItem('EMAIL');
    this.router.navigateByUrl('');
  }

  ngOnInit() {
    this.auth.profile().subscribe((data: User) => {
      this.user = data;
      this.loadData();
      this.hasLoaded = true;
    }, (err) => {
      this.router.navigateByUrl('');
    });
  }

  loadForm(id) {
    localStorage.setItem('FORM', id);
    this.router.navigateByUrl('forms');
  }
}
