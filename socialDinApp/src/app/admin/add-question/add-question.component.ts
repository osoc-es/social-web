import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  hasLoaded = false;

  amount;

  page = 1;

  question: {
    Question,
    description,
    isMandatory,
    QustionType,
    Options: string[]
  };

  formId = localStorage.getItem('FORM_ID');

  constructor(private p: ProjectService, private modal: NgbActiveModal) { }

  ngOnInit() {
    this.hasLoaded = true;
  }

  storeData(form) {
    let type;
    switch (form.value.QustionType) {
      case 'Texto abierto':
        type = '0';
        break;
      case 'Elección múltiple':
        type = '1';
        break;
      case 'Elección unitaria':
        type = '2';
        break;
      case 'Elección booleana (sí/no)':
        type = '3';
        break;
      case 'Pregunta de rango':
        type = '4';
        break;
    }
    this.question = {
      Question: form.value.Question,
      description: form.value.description,
      isMandatory: form.value.isMandatory === 'Sí' ? '1' : '0',
      QustionType: type,
      Options: []
    };
    if (type === '0') {
      this.amount = 1;
      this.next();
      this.next();
    } else if (type === '3') {
      this.question.Options.push('Sí');
      this.question.Options.push('No');
      this.sendData();
    }
    this.next();
  }

  submit2(form) {
    this.amount = form.value.amount;
    this.next();
  }

  next() {
    this.page === 3 ? this.page = 3 : this.page ++;
  }

  back() {
    this.page = 1;
  }

  sendData() {
    this.p.addQuestion(this.question, this.formId).subscribe(() => {
      this.modal.close();
    });
  }

  createQuestion(form) {
    for (let i = 0; i < this.amount; i++) {
      this.question.Options.push(form.value[i]);
    }
    this.sendData();
  }
}
