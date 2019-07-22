import { Answer } from './../../interfaces/answer';
import { Userdata } from './../../interfaces/usedata';
import { SocialService } from './../../services/social.service';
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

  hasLoaded = false;
  user: User;
  projects: Project[];
  conflicts: Conflict[] = [];
  Forms: Form[] = [];
  userdata: Userdata[] = [];

  constructor(private auth: AUTHService, private router: Router, private p: ProjectService, private social: SocialService) { }

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
          this.p.getConflicts().subscribe((conflicts: Conflict[]) => {
            for (const conflict of conflicts) {
              this.conflicts.push(conflict);
              this.p.getForms(conflict.ConflictId).subscribe((forms: Form[]) => {
                this.Forms.push(forms[0]);
                this.hasLoaded = true;
                this.social.getConflictPariticipants(conflict.title).subscribe((userdata: Userdata[]) => {
                  userdata.forEach(user => this.userdata.push(user));
                  this.hasLoaded = true;
                });
              });
            }
          });
        });
      });
    }
  }

  showData(userdata: Userdata) {
    console.log(userdata);
    this.social.getUserAnswers(userdata.ProblemType, userdata.Email).subscribe((answers: Answer[]) => {
      const answersCSV = this.toCSV(answers);
      console.log(answersCSV);
      // window.open(encodeURI(answersCSV));
    });
  }

  toCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < array.length; i++) {
      let line = '';
      // tslint:disable-next-line: forin
      for (const index in array[i]) {
          if (line !== '') { line += ','; }

          line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
}


  ngOnInit() {
    this.loadData();
  }

}
