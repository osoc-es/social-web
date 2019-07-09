import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class MainComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router) { }

  open() {
    if (localStorage.getItem('EMAIL') === null) {
      this.modalService.open(LoginComponent, {
        centered: true
      });
    } else {
      this.router.navigateByUrl('home');
    }
  }

  about() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  ngOnInit() {
  }

}
