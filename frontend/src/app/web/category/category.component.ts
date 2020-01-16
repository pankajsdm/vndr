import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from './../../shared/services/common.service';
import { environment } from './../../../environments/environment'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  latLong=[];
  catId: String;
  vendors: any;
  backendUrl = environment.backendUrl;
  
  constructor( 
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public cs: CommonService,
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.catId = params['id'];
      this.getVendorByCategory();
    });
  }

  getVendorByCategory() {
    this.cs.get(`web/getVendorByCategory/${this.catId}`).subscribe( res => {
      this.vendors =  res.data;
    },
    (err) =>{ 
      this.cs.showAlert('warn', "Something went Wrong!");
     }
    );
  } 
}
