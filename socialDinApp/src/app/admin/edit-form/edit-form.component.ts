import { User } from './../../interfaces/user';
import { AUTHService } from './../../services/auth.service';
import { Form } from './../../interfaces/form';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Questions } from 'src/app/interfaces/questions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddQuestionComponent } from '../add-question/add-question.component';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  hasLoaded = false;

  formId;

  forms: Form[] = [];

  questions: Questions[] = [];

  constructor(private p: ProjectService, private auth: AUTHService, private router: Router, private modal: NgbModal) { }

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

  getQuestions() {
    for (const form of this.forms) {
      this.p.getQuestions(form.FormId).subscribe((questions: Questions[]) => {
        questions.forEach((question) => this.questions.push(question));
      });
    }
  }

  ngOnInit() {
    this.isAdmin();
    const confId = localStorage.getItem('CONF_ID');
    this.p.getForms(confId).subscribe((data: Form[]) => {
      this.forms = data;
      this.getQuestions();
      this.hasLoaded = true;
    });
  }

  addQuestion(form) {
    localStorage.setItem('FORM_ID', form.FormId);
    const modal = this.modal.open(AddQuestionComponent);
    modal.result.then(() => {
      this.forms = [];
      this.questions = [];
      this.ngOnInit();
     },
    () => {
      this.forms = [];
      this.questions = [];
      this.ngOnInit();
    });
  }

}
