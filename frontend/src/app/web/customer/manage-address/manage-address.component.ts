import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonService } from './../../../shared/services/common.service';
import { environment } from './../../../../environments/environment'

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit {

  loginUser: any;
  getUser: any = [];
  filename:any;

  constructor(
    public cs: CommonService,
  ) { }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('user-vndr'));
    this.getProfile(this.loginUser._id);
  }

  getProfile(id):void {
    let path = 'user/detail';
    this.cs.getById(path,id).subscribe(async res => {
      this.getUser = res.data;
    });
  }

  setDefault(id){
    let address = this.getUser.customerAddress.filter(address => {
      return address._id === id;
    });
    this.cs.put(`user/updateUserByField/${this.loginUser._id}`,{defaultCustomerAddress: address[0]}).subscribe(async res => {
      this.getProfile(this.loginUser._id);
      this.cs.showAlert('success', res.message);   
    }, error => {
      this.cs.showAlert('warn', error);
    }); 
  }

  deleteAddress(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This address can not be recovered later!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        this.cs.put(`user/removeAddress/${this.loginUser._id}/${id}`,{type: "customerAddress"}).subscribe(async res => {
          this.getProfile(this.loginUser._id);
          this.cs.showAlert('success', res.message);   
        }, error => {
          this.cs.showAlert('warn', error);
        }); 
      }
    });
  }


}
