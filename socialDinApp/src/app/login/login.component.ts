import { User } from './../interfaces/user';
import { AUTHService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private auth: AUTHService, private router: Router) { }

  aux = '';
  aux2 = 'outline-';

  err = '';

  visible = 'password';
  visible2 = 'password';

  visible3 = 'password';

  canBeGuest() {
    return localStorage.getItem('EMAIL') === 'GUEST' ? false : true;
  }

  show() {
    this.visible = 'text';
  }

  show2() {
    this.visible2 = 'text';
  }

  show3() {
    this.visible3 = 'text';
  }

  hide() {
    this.visible = 'password';
  }

  hide2() {
    this.visible2 = 'password';
  }

  hide3() {
    this.visible3 = 'password';
  }

  loginClick() {
    this.aux = '';
    this.aux2 = 'outline-';
    this.err = '';
  }

  registerClick() {
    this.aux = 'outline-';
    this.aux2 = '';
    this.err = '';
  }

  login(form) {
    const body = form.value;
    body.OrgId = localStorage.getItem('ORG_ID');
    this.auth.login(body).subscribe(() => {
      this.auth.profile(form.value.Email).subscribe((profile: User) => {
        // localStorage.setItem('TOKEN', token);
        console.log(profile.OrgId.toString());
        console.log(localStorage.getItem('ORG_ID'));
        if (profile.title !== 'super' && profile.OrgId.toString() !== localStorage.getItem('ORG_ID')) {
          this.err = 'El usuario no pertenece a esta organización';
        } else {
          if (localStorage.getItem('EMAIL') !== 'GUEST') {
            localStorage.setItem('EMAIL', form.value.Email);
            this.activeModal.close();
            this.router.navigateByUrl('home');
          } else {
            localStorage.setItem('EMAIL', form.value.Email);
            this.activeModal.close();
          }
        }
      });
    }, (err) => {
      this.err = 'Usuario o contraseña incorrecta';
    });
  }

  guest() {
   localStorage.setItem('EMAIL', 'GUEST');
   this.activeModal.close();
   this.router.navigateByUrl('home');
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
      const body = form.value;
      body.OrgId = localStorage.getItem('ORG_ID');
      this.auth.register(body).subscribe(() => {
        if (localStorage.getItem('EMAIL') !== 'GUEST') {
          localStorage.setItem('EMAIL', form.value.Email);
          this.activeModal.close();
          this.router.navigateByUrl('home');
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
