import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../shared/services/common.service';
import { AuthService,  SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    signUpForm: FormGroup;
    isSignSubmited: boolean = false;
    checked=false;
    constructor( private fb: FormBuilder,
        public router: Router,
        private authService: AuthService,
        public cs: CommonService,
        ) {}

    ngOnInit() {
        this.signUpForm = this.fb.group({   // Signup form
              name: ['', [Validators.required, Validators.maxLength(20)]],
              email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
              password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
              role: ['3', []],
          });         
    }


    signUp() {
        if (this.signUpForm.invalid) {
          this.isSignSubmited = true;
          return;
        }
        this.signUpForm.value['email'] =  this.signUpForm.value.email.toLowerCase();
        this.cs.post('user/signup',this.signUpForm.value).subscribe(user => {           
              this.cs.showAlert('success', user.message);
              if(user.status == 200) this.router.navigate(['login']);
          }, error => { 
            this.cs.showAlert('error', error);
          });
      }
         
}
