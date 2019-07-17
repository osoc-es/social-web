import { Router } from '@angular/router';
import { AUTHService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal, private auth: AUTHService, private router: Router) { }

  hasLoaded = true;

  err = '';

  visible = 'password';
  visible2 = 'password';


  canBeGuest() {
    return localStorage.getItem('EMAIL') === 'GUEST' ? false : true;
  }

  show() {
    this.visible = 'text';
  }

  show2() {
    this.visible2 = 'text';
  }


  hide() {
    this.visible = 'password';
  }

  hide2() {
    this.visible2 = 'password';
  }

  onKeyDown(event) {
    if (event.key === 'Escape') {
      this.activeModal.dismiss();
    }
  }

  register(form) {
    if (form.value.Password !== form.value.Password2) {
      this.err = 'Las contraseñas no coinciden';
    } else {
      this.err = '';
      this.auth.register(form.value).subscribe(() => {
        if (localStorage.getItem('EMAIL') !== 'GUEST') {
          localStorage.setItem('EMAIL', form.value.Email);
          this.activeModal.close();
        } else {
          localStorage.setItem('EMAIL', form.value.Email);
          this.activeModal.close();
        }
      }, (err) => {
        this.err = 'El email ya está registrado';
      });
    }
  }

  ngOnInit() {
  }


}
