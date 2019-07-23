import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-conflict',
  templateUrl: './create-conflict.component.html',
  styleUrls: ['./create-conflict.component.css']
})
export class CreateConflictComponent implements OnInit {

  hasLoaded = true;

  constructor(private p: ProjectService, private modal: NgbActiveModal) { }

  ngOnInit() {
  }

  submit(form) {
    const body = {
      title: form.value.title,
      description: form.value.description,
    };
    this.p.createConflict(body).subscribe((data: {
      ConflictId: number
    }) => {
      const formbody = {
        description: form.value.fdescription
      };
      this.p.createForm(formbody, data.ConflictId).subscribe(() => {
        this.modal.close();
      });
    });
  }

}
