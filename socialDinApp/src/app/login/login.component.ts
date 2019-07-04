import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  login(form) {
    console.log(form);
    // TODO: INCORPORAR SERVICIO PARA CONEXIÓN CON LA API
  }

  ngOnInit() {
  }

}
