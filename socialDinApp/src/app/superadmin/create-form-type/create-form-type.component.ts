import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-form-type',
  templateUrl: './create-form-type.component.html',
  styleUrls: ['./create-form-type.component.css']
})
export class CreateFormTypeComponent implements OnInit {

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
