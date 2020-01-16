import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from './../../shared/services/common.service';
import { DataService } from './../../services/data.service'
import { environment } from './../../../environments/environment'
import Swal from 'sweetalert2' 
import {Location} from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  slug: String;
  services: any = [];
  cart=[];
  user:any;
  backendUrl = environment.backendUrl;
  specialInstruction:string="";

  customOptions: OwlOptions = {
    margin: 10,
    items:1,
  }
  constructor(
    private _location: Location,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public cs: CommonService,
    public ds: DataService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.getVendorBySlug(this.slug);
    });
    var cartArr = JSON.parse(localStorage.getItem("cart"));
    this.user = JSON.parse(localStorage.getItem('user-vndr'))
    if (cartArr !=null  && cartArr.length>0 ) {
     this.cart=cartArr;
    }
  }

  getVendorBySlug(slug) {
    this.cs.get(`web/getPackageByItemId/${slug}`).subscribe( res => {
      this.services =  {...res.data, items: res.data.items.map(row => {
        row.isChecked = this.cart.findIndex(c => c.packageId === row._id) > -1;
        return row;
      })};
    },
    (err) =>{  
      this.cs.showAlert('warn', "Something went Wrong!");
     }
    );
  }
  cartUpdate(packages,event,itemId,itemImage,itemName,itemSlug,itemDescription,itemPackageDirectory,itemDirectory,vendorId,companyName){
    var obj={
      packageId:packages._id,packageName:packages.name,packageDesc:packages.desc,packageImages:packages.images,packagePrice:packages.price,itemId:itemId,itemImage:itemImage,itemName:itemName,itemSlug:itemSlug,itemDescription:itemDescription,itemPackageDirectory:itemPackageDirectory,itemDirectory:itemDirectory,vendorId:vendorId,companyName:companyName
    }
   
    if (obj && event) {
      var vendorIndex = this.cart.findIndex(p => p.vendorId == obj.vendorId)
      if (this.cart && this.cart.length>0 && vendorIndex==-1) {
        this.checkVendor(obj);
      }else{
        this.addItemToCart(obj);
      }     
    }else{
      var index = this.cart.findIndex(p => p.packageId == obj.packageId)
      this.cart.splice(index, 1);
      this.updateList(obj.packageId, false);
      }          
  }


 updateList(itemId, status){
  var packageIndex = this.services.items.findIndex(p => itemId === p._id);
  this.services.items[packageIndex].isChecked = status;
  this.services = {...this.services};  
 }

 addItemToCart(obj){
    var index = this.cart.findIndex(p => p.packageId == obj.packageId)
      if (this.cart !=null && index==-1) {
        this.cart.push(obj);
      }
      
      if(this.cart == null){
        this.cart.push(obj);
      }
      this.updateList(obj.packageId, true);
  }

  checkVendor(obj){  
    this.updateList(obj.packageId, true);
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you chnage the vendor previous cart will be removed. Do you want to remove the current cart?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {          
      if (result.value) {
        this.cart=[];
        localStorage.removeItem('cart');  
        this.addItemToCart(obj);
        return true;
      }else{ 
        this.updateList(obj.packageId, false);
        return false;
      }
    })
  }

  addItemsToFinalCart(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
    const cartCount=this.cart.length
    this.ds.setCart(cartCount,'cartCount');
    this._location.back();
  }

}
