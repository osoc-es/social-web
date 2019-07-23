import { FormService } from './../services/form.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectConflicts } from '../interfaces/project-conflicts';

@Component({
  selector: 'app-conflict-list',
  templateUrl: './conflict-list.component.html',
  styleUrls: ['./conflict-list.component.css']
})
export class ConflictListComponent implements OnInit {

  hasLoaded = false;

  conflicts: ProjectConflicts[];

  constructor(private p: FormService, private router: Router) { }

  loadData() {
    this.p.getConflictsFromProject(localStorage.getItem('PROJECT_ID')).subscribe((data: ProjectConflicts[]) => {
      this.conflicts = data;
      if (data.length === 1) {
        this.openForm(data[0].ConflictId);
      } else {
        this.hasLoaded = true;
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  openForm(conflictId) {
    localStorage.setItem('CONF_ID', conflictId);
    this.router.navigateByUrl('conflicts/forms');
  }

}
