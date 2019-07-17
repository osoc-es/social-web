import { Form } from './../../interfaces/form';
import { Conflict } from './../../interfaces/conflict';
import { ProjectService } from 'src/app/services/project.service';
import { User } from './../../interfaces/user';
import { AUTHService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-social-panel',
  templateUrl: './social-panel.component.html',
  styleUrls: ['./social-panel.component.css']
})
export class SocialPanelComponent implements OnInit {

  hasLoaded = true;
  user: User;
  projects: Project[];
  conflicts: Conflict[] = [];
  Forms: Form[] = [];

  constructor(private auth: AUTHService, private router: Router, private p: ProjectService) { }

  loadData() {
    const email = localStorage.getItem('EMAIL');
    if (email === 'GUEST' || email === null) {
      this.router.navigateByUrl('home');
    } else {
      this.auth.profile(email).subscribe((data: User) => {
        this.user = data;
        if (data.title !== 'admin' && data.title !== 'social') {
          this.router.navigateByUrl('home');
        }
        this.p.getProjects(1).subscribe((projects: Project[]) => {
          this.projects = projects;
          for (const project of projects) {
            this.p.getConflicts(project.ProjectId).subscribe((conflicts: Conflict[]) => {
              for (const conflict of conflicts) {
                this.conflicts.push(conflict);
                this.p.getForms(conflict.ConflictId).subscribe((forms: Form[]) => {
                  this.Forms.push(forms[0]);
                  this.hasLoaded = true;
                });
              }
            });
          }
        });
      });
    }
  }

  ngOnInit() {
    this.loadData();
  }

}
