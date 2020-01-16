import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from './../../shared/services/common.service';
import { environment } from './../../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latLong=[];
  backendUrl = environment.backendUrl;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    stagePadding: 80,
    margin:10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  homeData: any = {
    categories: [],
    popularArroundYou: [],
    topRatedVendor: []
  };

  constructor(public router: Router, public cs: CommonService) {
  }

  ngOnInit() {
    //this.getGeoLocation();
    this.getById();
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var cordinates = position.coords;
        this.latLong = [cordinates.longitude, cordinates.latitude];
        this.getById();
      });
    }
  }

  getById():void {
    var obj={latLong:(this.latLong && this.latLong.length>0)?this.latLong:""}
    this.cs.post('web/homeItems',obj).subscribe(async res => {  
      this.homeData = res.data;
    },error => {
      this.cs.showAlert('warn', error);
    });
  }

  

}
