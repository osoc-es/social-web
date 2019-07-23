import { Conflict } from './../../interfaces/conflict';
import { Project } from 'src/app/interfaces/project';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-conflict',
  templateUrl: './create-conflict.component.html',
  styleUrls: ['./create-conflict.component.css']
})
export class CreateConflictComponent implements OnInit {

  hasLoaded = false;

  projects: Project[];

  conflicts: Conflict[];

  constructor(private p: ProjectService, private modal: NgbActiveModal) { }

  getProjects() {
    this.p.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      this.getConflicts();
    });
  }

  getConflicts() {
    this.p.getConflicts().subscribe((conflicts: Conflict[]) => {
      this.conflicts = conflicts;
      this.hasLoaded = true;
    });
  }

  ngOnInit() {
    this.getProjects();
  }

  submit(form) {
    const conflictId = this.conflicts.find(conflict => {
      return conflict.title === form.value.conflict;
    }).ConflictId;
    const projectId = this.projects.find(project => {
      return project.name === form.value.project;
    }).ProjectId;
    this.p.addConflictToProject(projectId, conflictId).subscribe(() => {
      this.modal.close();
    });
  }

}
