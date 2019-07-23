import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../interfaces/organization';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class MainComponent implements OnInit {

  hasLoaded = false;

  organization: Organization;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router, private org: OrganizationService) { }

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

  getOrganization() {
    this.org.getOrganizationList().subscribe((orgs: Organization[]) => {
      this.organization = orgs.find(org => {
        return org.OrgUrl === window.location.hostname;
      });
      if (this.organization !== undefined) {
        localStorage.setItem('ORG_ID', this.organization.OrgId);
        this.hasLoaded = true;
      }
    });
  }

  ngOnInit() {
    this.getOrganization();
  }

}
