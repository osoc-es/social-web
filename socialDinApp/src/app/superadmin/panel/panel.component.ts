import { ProjectService } from 'src/app/services/project.service';
import { Conflict } from './../../interfaces/conflict';
import { User } from './../../interfaces/user';
import { AUTHService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateConflictComponent } from 'src/app/admin/create-conflict/create-conflict.component';
import { CreateFormTypeComponent } from '../create-form-type/create-form-type.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  hasLoaded = false;

  conflicts: Conflict[];

  user: User;

  constructor(private auth: AUTHService, private router: Router, private modal: NgbModal, private p: ProjectService) { }

  ngOnInit() {
    this.auth.profile(localStorage.getItem('EMAIL')).subscribe((profile: User) => {
      this.user = profile;
      if (this.user.title !== 'super') {
        this.router.navigateByUrl('');
      }
      this.p.getConflicts().subscribe((data: Conflict[]) => {
        this.conflicts = data;
        this.hasLoaded = true;
      });
    });
  }

  createConflict() {
    const modal = this.modal.open(CreateFormTypeComponent);
    modal.result.then(() => {
      this.ngOnInit();
    }, () => {
      this.ngOnInit();
    });
  }

  editForm(conflictId) {
    localStorage.setItem('CONF_ID', conflictId);
    this.router.navigateByUrl('admin/form');
  }

}
