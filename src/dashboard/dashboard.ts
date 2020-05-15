import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

const styles = require('./dashboard.css');
const template = require('./dashboard.html');

@Component({
  selector: 'dashboard',
  template: template,
  styles: [ styles ]
})
export class Dashboard {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  dashboard: string;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('token');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.dashboard = window.dashboard();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  dashboard() {
    this.authHttp.get('http://test-demo.aem-enersol.com/api/dashboard')
    .subscribe(
      response => {
        return response.json();
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

}
