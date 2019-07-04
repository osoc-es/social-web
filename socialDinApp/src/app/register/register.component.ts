import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  err = '';

  constructor() { }

  register(form) {
    if (form.value.password !== form.value.password2) {
      this.err = 'Las contraseñas no coinciden';
    } else {
      this.err = '';
      // TODO: USAR SERVICIO PARA LLAMAR A LA API Y QUE SE GUARDEN LOS DATOS
    }
  }

  ngOnInit() {
  }

}
