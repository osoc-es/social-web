import { ProjectConflicts } from './../interfaces/project-conflicts';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateConflictComponent } from './create-conflict/create-conflict.component';
import { Project } from './../interfaces/project';
import { ProjectService } from './../services/project.service';
import { User } from './../interfaces/user';
import { AUTHService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from './create-project/create-project.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  hasLoaded = false;

  projects: Project[];

  projectConflicts: ProjectConflicts[];

  constructor(private auth: AUTHService, private router: Router, private project: ProjectService, private modal: NgbModal) { }

  loadTree() {
    this.project.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
      this.hasLoaded = true;
      this.project.getProjectsAndConflicts().subscribe((conflicts: ProjectConflicts[]) => {
        this.projectConflicts = conflicts;
      });
    });
  }

  isAdmin() {
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
    this.isAdmin();
    this.loadTree();
  }

  createProject() {
    const modal = this.modal.open(CreateProjectComponent);
    modal.result.then(() => {
      this.ngOnInit();
    }, () => {
      this.ngOnInit();
    });
  }

  createConflict() {
    const modal = this.modal.open(CreateConflictComponent);
    modal.result.then(() => {
      this.ngOnInit();
    }, () => {
      this.ngOnInit();
    });
  }

  editForm(conflict) {
    localStorage.setItem('CONF_ID', conflict);
    this.router.navigateByUrl('admin/form');
  }

  createUser() {
    const modal = this.modal.open(CreateUserComponent);
    modal.result.then(() => {
      this.ngOnInit();
    }, () => {
      this.ngOnInit();
    });
  }

}
