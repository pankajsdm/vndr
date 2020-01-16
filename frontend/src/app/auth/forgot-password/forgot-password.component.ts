import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CommonService } from './../../shared/services/common.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
    forgotForm: FormGroup;
    resetForm: FormGroup;
    // tslint:disable-next-line:no-inferrable-types
    isForgotSubmited: boolean = false;
    // tslint:disable-next-line:no-inferrable-types
    isResetSubmited: boolean = false;
    // tslint:disable-next-line:no-inferrable-types
    resetpassword: boolean = false;

  constructor(
    public cs: CommonService,
    public router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({  // forgot password form
        email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      });
  }

  forgotPassword() {
    if (this.forgotForm.invalid) {
      this.isForgotSubmited = true;
      return;
    }
    // tslint:disable-next-line:prefer-const
    this.forgotForm.value['email'] =  this.forgotForm.value.email.toLowerCase();
    let path = 'user/forgotPassword';
    this.cs.post(path, this.forgotForm.value)
      .subscribe( data => {
        // tslint:disable-next-line:triple-equals
        if (data.status == 200) {
          this.cs.showAlert('success', data.message);
          // this.router.navigate(['/login']);
          this.createResetForm();
        } else {
          this.cs.showAlert('warn', data.message);
        }
    }, error => { });
  }

  createResetForm() {
    this.resetpassword = true;
    this.resetForm = this.fb.group({  // forgot password form
      otp: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      this.isResetSubmited = true;
      return;
    }
    // tslint:disable-next-line:prefer-const
    let path = 'user/resetPassword';
    this.cs.post(path, this.resetForm.value)
      .subscribe( data => {
        // tslint:disable-next-line:triple-equals
        if (data.status == 200) {
          this.cs.showAlert('success', data.message);
          this.router.navigate(['/login']);
        } else {
          this.cs.showAlert('warn', data.message);
        }
    }, error => { });
  }
}
