import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from './../../../shared/services/common.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm: FormGroup;
  isSubmited: Boolean = false;
  loginUser: any;
  userDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    public router: Router,
    public cs: CommonService
  ) { 
    this.userForm = this.fb.group({
      name:['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      aboutMe: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('user-vndr'));
    this.getById(this.loginUser._id);
  }

  getById(_id):void {
    this.cs.getById('user/detail',_id).subscribe(async res => {  
      this.userDetails = res.data;
      var obj = {
        name: res.data.name,
        phoneNumber: res.data.phoneNumber,
        aboutMe: res.data.aboutMe,
        location: res.data.location
      }
      this.userForm.patchValue(obj);
    }, error => {
      this.cs.showAlert('warn', error);
    });
  }

  updateProfile(){
    this.isSubmited = true;
    if(this.userForm.valid){
      this.cs.put(`user/update/${this.loginUser._id}`, this.userForm.value).subscribe(async res => {  
        this.cs.showAlert('success', res.message);
        this.router.navigate(['/customer'])
      }, error => {
        this.cs.showAlert('warn', error);
      });
    }
  }

}
