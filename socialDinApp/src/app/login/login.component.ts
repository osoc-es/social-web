import { AUTHService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private auth: AUTHService) { }
  isLogin = true;
  aux = '';
  aux2 = 'outline-';

  err = '';

  loginClick() {
    this.aux = '';
    this.aux2 = 'outline-';
  }

  registerClick() {
    this.aux = 'outline-';
    this.aux2 = '';
  }

  login(form) {
    this.auth.login(form.value).subscribe(() => {
    });
  }

  onKeyDown(event) {
    if (event.key === 'Escape') {
      this.activeModal.dismiss();
    }
  }

  register(form) {
    if (form.value.password !== form.value.password2) {
      this.err = 'Las contraseñas no coinciden';
    } else {
      this.err = '';
      this.auth.register(form.value).subscribe((token: string) => {
        localStorage.setItem('TOKEN', token);
        localStorage.setItem('EMAIL', form.value.email);
      });
    }
  }

  ngOnInit() {
  }

}
