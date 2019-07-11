import { Answer } from './../interfaces/answer';
import { Router } from '@angular/router';
import { FormService } from './../services/form.service';
import { Component, OnInit } from '@angular/core';
import { Questions } from '../interfaces/questions';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  constructor(private dinapp: FormService, private router: Router) { }

  hasLoaded = false;
  def = false;
  questions: [Questions];

  ngOnInit() {
    this.loadQuestions();
    this.hasLoaded = true;
  }

  submit(answers) {
    console.log(answers.value);
    const email = localStorage.getItem('EMAIL');
    console.log(email);
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
        Email: email,
        QuestionId: this.questions[i].QuestionId,
        Answer: answer,
        AnswerType: this.questions[i].QustionType,
      }) as Answer;
      array.push(ans);
    }
    console.log(array);
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
