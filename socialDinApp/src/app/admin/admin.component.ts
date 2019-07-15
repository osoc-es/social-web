import { Project } from './../interfaces/project';
import { ProjectService } from './../services/project.service';
import { User } from './../interfaces/user';
import { AUTHService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  hasLoaded = false;

  projects: Project;

  constructor(private auth: AUTHService, private router: Router, private project: ProjectService) { }

  loadData() {
    this.project.getProjects(1).subscribe((data: Project) => {
      this.projects = data;
      console.log(data);
    });
  }

  getUser() {
    this.auth.profile(localStorage.getItem('EMAIL')).subscribe((profile: User) => {
      if (profile.title !== 'admin') {
        this.router.navigateByUrl('home');
      }
    }, (err) => {
      if (localStorage.getItem('EMAIL') === null) {
        this.router.navigateByUrl('');
      } else {
        console.log(err);
      }
    });
  }

  ngOnInit() {
    this.getUser();
    this.loadData();
    this.hasLoaded = true;
  }

}
