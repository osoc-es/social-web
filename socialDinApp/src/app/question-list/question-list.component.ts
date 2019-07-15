import { Answer } from './../interfaces/answer';
import { Router } from '@angular/router';
import { FormService } from './../services/form.service';
import { Component, OnInit } from '@angular/core';
import { Questions } from '../interfaces/questions';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  constructor(private dinapp: FormService, private router: Router, private modal: NgbModal) { }

  hasLoaded = false;
  def = false;
  questions: [Questions];
  email: string;

  ngOnInit() {
    this.email = localStorage.getItem('EMAIL');
    this.loadQuestions();
    this.hasLoaded = true;
  }

  submit(answers) {
    this.email = localStorage.getItem('EMAIL');
    if (this.email !== 'GUEST') {
      // BUILD JSON ARRAY
      const array: Answer[] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.questions.length; i++) {
        let answer = '';
        // MIX IN ALL KEYS
        if (this.questions[i].QustionType === '1' || this.questions[i].QustionType === '0') {
          for (let j = 0; j < this.questions[i].Options.length; j++) {
            const test = `${i}-${j}`;
            if (answers.value[test]) {
              answer === '' ? answer = '' : answer += ', ';
              answer += `${this.questions[i].Options[j].OptionDescription}`;
            }
          }
        } else {
          answer = answers.value[i];
        }
        const ans = ({
          Email: this.email,
          QuestionId: this.questions[i].QuestionId,
          Answer: answer,
          AnswerType: this.questions[i].QustionType,
        }) as Answer;
        array.push(ans);
      }
      this.dinapp.postAnswers(array).subscribe((data) => {
        console.log(data);
      });
    } else {
      this.modal.open(LoginComponent);
    }
  }

  loadQuestions() {
    const id = localStorage.getItem('FORM');
    if (id === null) {
      this.router.navigateByUrl('');
    } else {
      this.dinapp.getForm(id).subscribe((data: [{
        FormId: number,
        ConflictId: number,
        description: string,
      }]) => {
        this.dinapp.getQuestions(data[0].FormId).subscribe((questions: [Questions]) => {
          this.questions = questions;
          console.log(questions);
        }, () => {
          this.router.navigateByUrl('');
        });
      }, () => {
        this.router.navigateByUrl('');
      });
    }
  }

}
