import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class MainComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) { }

  open() {
    this.modalService.open(LoginComponent, {
      centered: true
    });
  }

  ngOnInit() {
  }

}
