import { Project } from './../interfaces/project';
import { Router } from '@angular/router';
import { Conflict } from './../interfaces/conflict';
import { AUTHService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AUTHService, private dinapp: FormService, private router: Router) { }

  user: User;

  isGuest: boolean;

  hasLoaded = false;

  projects: Project[];

  toAdmin() {
    this.router.navigateByUrl('admin');
  }

  toStats() {
    this.router.navigateByUrl('social');
  }

  loadData() {
    this.dinapp.getProjects(1).subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  logOut() {
    localStorage.removeItem('EMAIL');
    this.router.navigateByUrl('');
  }

  ngOnInit() {
    const email = localStorage.getItem('EMAIL');
    if (email !== 'GUEST') {
      this.isGuest = false;
      this.auth.profile(email).subscribe((data: User) => {
        this.user = data;
        this.loadData();
        this.hasLoaded = true;
      }, (err) => {
        this.router.navigateByUrl('');
      });
    } else {
      this.isGuest = true;
      this.loadData();
      this.hasLoaded = true;
    }
  }

  loadConflicts(id) {
    localStorage.setItem('PROJECT_ID', id);
    this.router.navigateByUrl('conflicts');
  }
}
