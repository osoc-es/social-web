import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(private project: ProjectService) { }

  submit(form) {
    console.log(form.value);
    this.project.createProject(form.value, 1).subscribe(() => {
      console.log('project created succesfully');
    });
  }

  ngOnInit() {
  }

}
