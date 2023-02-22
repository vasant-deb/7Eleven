import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
 
  constructor(private spinner: NgxSpinnerService,private router: Router,private sharedService: SharedService) { }
  firstname: string = '';
  lastname: string = '';
  countcart: number = 0;
  cart: any[] = [];

  ngOnInit() {
    
    let email=localStorage.getItem('email');
    let token=localStorage.getItem('token');
    if(email){
      this.spinner.show();
    this.sharedService.setValue({email: email, token: token})
      .then(res => {
        this.firstname = res?.firstname;
        this.lastname = res?.lastname;
 
        this.spinner.hide();
      });
    }
  }
  home() {
    this.router.navigate(['/']);
  }
  logout() {
    debugger;
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
