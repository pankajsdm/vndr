import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from './../../../../shared/services/common.service';
import { environment } from './../../../../../environments/environment';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-save-address',
  templateUrl: './save-address.component.html',
  styleUrls: ['./save-address.component.scss']
})
export class SaveAddressComponent implements OnInit {

  addressForm: FormGroup;
  isSubmited: Boolean = false;
  formated_address: string = "";
  loginUser: any;
  userDetails: any;
  addressId: string;
  actionLabel: string;

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    public router: Router,
    public cs: CommonService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.addressForm = this.fb.group({
      pincode:['', [Validators.required]],
      houseBuilding:['', [Validators.required]],
      area:['', [Validators.required]],
      city:['', [Validators.required]],
      state:['', [Validators.required]],
      country:['', [Validators.required]],
      name:['', [Validators.required]],
      contact: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('user-vndr'));
    this.activatedRoute.params.subscribe((params: Params) => {
      this.addressId = params['id'];
      if(this.addressId){
        this.getById(this.loginUser._id, this.addressId);
        this.actionLabel = 'Update';
      }else{
        this.actionLabel = 'Add';
      }
    });
  }

  getById(userId, addressId):void {
    this.cs.getById('user/detail',userId).subscribe(async res => {  
      this.userDetails = res.data;
      if(this.userDetails.customerAddress){
        let address = this.userDetails.customerAddress.filter(address => {
          return address._id === addressId;
        });
        this.formated_address = address[0].area;
        this.addressForm.patchValue(address[0]);
      }     
    }, error => {
      this.cs.showAlert('warn', error);
    });
  }

  onAutocompleteSelected(results: PlaceResult) {   
    let city, state, country;  
    if (results && results.formatted_address) {
      results.address_components.map(current=> {
        current.types.map(type=> {
          if(type=='locality'){
            city = current.long_name;
          }
          if(type=='administrative_area_level_1'){
            state = current.long_name;
          }
          if(type=='country'){
            country = current.long_name;
          }
        })
      });
      
      var obj = { city: city, state: state, country: country, area: results.formatted_address};
      this.addressForm.patchValue(obj);
    }
}

  saveAddress(){  
      this.isSubmited = true;
      if(this.addressForm.valid){
        let reqPath;
        if(this.addressId){
          reqPath = `user/updateAddress/${this.loginUser._id}/${this.addressId}`;
          this.updateAddress(reqPath, 'customerAddress');
        }else{
          reqPath = `user/addAddress/${this.loginUser._id}`;
          this.addAddress(reqPath);
        }
      }
  }

  addAddress(reqPath){
    this.cs.put(reqPath, {customerAddress: this.addressForm.value}).subscribe(async res => {  
      this.cs.showAlert('success', res.message);
      this.router.navigate(['/customer/manage-address'])
    }, error => {
      this.cs.showAlert('warn', error);
    });
  }

  updateAddress(reqPath, type){
    this.addressForm.value.type = type;
    this.cs.put(reqPath, this.addressForm.value).subscribe(async res => {  
      this.cs.showAlert('success', res.message);
      this.router.navigate(['/customer/manage-address'])
    }, error => {
      this.cs.showAlert('warn', error);
    });
  }

}