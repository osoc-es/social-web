import { ProjectService } from './../../services/project.service';
import { Project } from './../../interfaces/project';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-conflict',
  templateUrl: './create-conflict.component.html',
  styleUrls: ['./create-conflict.component.css']
})
export class CreateConflictComponent implements OnInit {

  projects: Project[];
  hasLoaded = false;

  constructor(private p: ProjectService, private modal: NgbActiveModal) { }

  ngOnInit() {
    this.p.getProjects(1).subscribe((data: Project[]) => {
      this.projects = data;
      this.hasLoaded = true;
    });
  }

  submit(form) {
    const body = {
      title: form.value.title,
      description: form.value.description,
    };
    const id = this.projects.find((element) => {
      return element.name === form.value.conflicts;
    }).ProjectId;
    this.p.createConflict(body, id).subscribe(() => {
      console.log('project created succesfully');
      this.modal.close();
    });
  }

}
