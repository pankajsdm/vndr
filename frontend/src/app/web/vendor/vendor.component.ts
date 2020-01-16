import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from './../../shared/services/common.service';
import { environment } from './../../../environments/environment'

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  slug: String;
  vendors: any = [];
  backendUrl = environment.backendUrl;
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public cs: CommonService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.getVendorBySlug(this.slug);
    });
  }

  getVendorBySlug(slug) {
    this.cs.get(`web/getVendorById/${slug}`).subscribe( res => {
      this.vendors =  res.data;
    },
    (err) =>{  
      this.cs.showAlert('warn', "Something went Wrong!");
     }
    );
  }

}
