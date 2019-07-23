import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(private project: ProjectService, private modal: NgbActiveModal) { }

  submit(form) {
    this.project.createProject(form.value).subscribe(() => {
      this.modal.close();
    });
  }

  ngOnInit() {
  }

}
