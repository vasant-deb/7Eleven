import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from '../auth.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService,private authService: AuthService, private router: Router, private slides: SlickCarouselModule) { }
  categories: any[] = [];
  newproducts:any[]=[];
  saleproducts:any[]=[];
ngOnInit(): void {
  this.spinner.show();
  this.getcategories();
  this.getnewproducts();
  this.getallproducts();
  this.spinner.hide();
}
slideConfig = {
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  arrows: false,
  dots: false,
  pauseOnHover: false,
  responsive: [{
      breakpoint: 768,
      settings: {
          slidesToShow: 4
      }
  }, {
      breakpoint: 520,
      settings: {
          slidesToShow: 3
      }
  }]
};
  getcategories(){
    
    this.authService.getcategories()
        .subscribe(
          res => {
            this.categories = res?.stats;
        //    this.spinner.hide();
          },
          err => {
            console.log(err);
          }
        );
  }
  getnewproducts(){
 
    this.authService.newproducts()
    .subscribe(
      res => {
        this.newproducts = res?.stats;
     //   this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    );
  }
  getallproducts(){
    this.authService.getallproducts()
    .subscribe(
      res => {
        this.saleproducts = res?.stats;
     //   this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    );
  }
}
