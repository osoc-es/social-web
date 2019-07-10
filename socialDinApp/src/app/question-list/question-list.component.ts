import { FormService } from './../services/form.service';
import { Component, OnInit } from '@angular/core';
import { Questions } from '../interfaces/questions';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  constructor(private dinapp: FormService, ) { }

  hasLoaded = false;
  questions: [Questions];

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    const id = localStorage.getItem('FORM');
    this.dinapp.getForm(id).subscribe((data: [{
      FormId: number,
      ConflictId: number,
      description: string,
    }]) => {
      this.dinapp.getQuestions(data[0].FormId).subscribe((questions: [Questions]) => {
        this.questions = questions;
        console.log(questions);
      });
    });
  }

}
