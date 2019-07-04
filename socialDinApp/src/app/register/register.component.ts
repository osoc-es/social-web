import { AUTHService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  err = '';

  constructor(private auth: AUTHService) { }

  register(form) {
    if (form.value.password !== form.value.password2) {
      this.err = 'Las contraseñas no coinciden';
    } else {
      this.err = '';
      this.auth.register(form.value).subscribe((token) => {
        console.log(token);
      });
    }
  }

  ngOnInit() {
  }

}
