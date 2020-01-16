import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../shared/services/common.service';
import { Router } from '@angular/router';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-signup-vendor',
  templateUrl: './signup-vendor.component.html',
  styleUrls: ['./signup-vendor.component.scss'],
  animations: [routerTransition()]
})
export class SignupVendorComponent implements OnInit {  
  signUpForm: FormGroup;
  isSignSubmited: boolean = false;
  checked=false;
  categoryArr: any;
  issubCategoryArr=false;
  subCategoryArr: any;
  locationObj:any;
  formated_address: string = "";
  constructor( private fb: FormBuilder,
      public router: Router,
      public cs: CommonService,
      ) {}

  ngOnInit() {
      this.signUpForm = this.fb.group({   // Signup form
          companyName: ['', [Validators.required, Validators.maxLength(20)]],
          role: ['2', []],
          email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
          password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],          
          categoryId: ['', []],
          subcategoryId: ['', []],
          isActive: [false, []],
          geoLocation: ['', []],
          numberOfBooking: ['', [Validators.required, Validators.maxLength(20)]]
        });     
        this.getCategory();   
        this.getGeoLocation(); 
  }


  onAutocompleteSelected(results: PlaceResult) {     
    if (results&&results.formatted_address) {
      this.formated_address = results.formatted_address;
      this.locationObj = {
            location: [results.geometry.location.lng(), results.geometry.location.lat()],
            formattedAddress: results.formatted_address
      }
      this.signUpForm.patchValue({
        geoLocation:  this.locationObj
      });
    }
}

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var cordinates = position.coords;
        var latLong = cordinates.latitude + "," + cordinates.longitude;
        this.cs.getLocation(latLong).subscribe(results => {
          if (results) {
            if (
              results &&
              results.results &&
              results.results[0] &&
              results.results[0].formatted_address
            ) {
              this.formated_address = results.results[0].formatted_address;
              this.locationObj={
                    location: [results.results[0].geometry.location.lng, results.results[0].geometry.location.lat],
                    formattedAddress: results.results[0].formatted_address
                }
              this.signUpForm.patchValue({
                geoLocation:  this.locationObj
              });
            }
          }
        });
      });
    }
  }


  signUp() {
      if (this.signUpForm.invalid) {
        this.isSignSubmited = true;
        return;
      }
      this.signUpForm.value['email'] =  this.signUpForm.value.email.toLowerCase();
      this.cs.post('user/register',this.signUpForm.value).subscribe(user => {           
            this.cs.showAlert('success', user.message);
            if(user.status == 200) this.router.navigate(['login']);
        }, error => { 
          this.cs.showAlert('error', error);
        });
    }
    

    getCategory(): void {
      this.cs.get('category/getAll').subscribe(res => {
        if (res.status === 200) {
          this.categoryArr = res.data.data;
          if(this.categoryArr.length>0){
            this.signUpForm.patchValue({categoryId:this.categoryArr[0]._id});
            this.getSubCategory(this.categoryArr[0]._id); 
          }     
        } else {
          this.cs.showAlert('warn', res.message);
        }
      },
        error => {
          this.cs.showAlert('warn', error);
        });
    }
  
    getSubCategory(_id): void {
      this.cs.get('subcategory/categoryById/' + _id).subscribe(res => {
        if (res.status === 200) {
          this.subCategoryArr = res.data;
          this.issubCategoryArr = true;
          if(this.subCategoryArr.length>0){
            this.signUpForm.patchValue({subcategoryId:this.subCategoryArr[0]._id});
          }
        } else {
          this.cs.showAlert('warn', res.message);
        }
      },
        error => {
          this.cs.showAlert('warn', error);
        });
    }       
}
