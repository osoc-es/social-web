import { Conflict } from './../interfaces/conflict';
import { FormService } from './../services/form.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conflict-list',
  templateUrl: './conflict-list.component.html',
  styleUrls: ['./conflict-list.component.css']
})
export class ConflictListComponent implements OnInit {

  hasLoaded = false;

  conflicts: Conflict[];

  constructor(private p: FormService, private router: Router) { }

  loadData() {
    this.p.getConflicts(localStorage.getItem('PROJECT_ID')).subscribe((data: Conflict[]) => {
      this.conflicts = data;
      this.hasLoaded = true;
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
