import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../shared/services/common.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/reducers';
import { UserAction } from '../../shared/actions/user';
import { environment } from '../../../environments/environment';
import { AuthService,  SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { ChatService } from  '../../shared/services/chat.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loginForm: FormGroup;
  isSubmited: boolean = false;
  message: string;
  constructor(
    public router: Router,
    public cs: CommonService,
    private chatService: ChatService,
    private fb: FormBuilder,
    private authService: AuthService,
    public store: Store<fromRoot.State>
  ) { }


  ngOnInit() {
      this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
          password: [null, [Validators.required]],
      });
  }

  
  onLoggedin() {
    this.isSubmited = true;
      if (this.loginForm.invalid) {
        return;
      }
      this.loginForm.value['email'] =  this.loginForm.value.email.toLowerCase();
      this.cs.post('user/login', this.loginForm.value)
      .subscribe( data => {
        if (data.status == 200) {
          this.applyLogin(data.data); 
        } else {
          this.cs.showAlert('warn', data.message);
        }
      },
      error => { });
  }

  genpasswd(n) {
    if (n > 10)
        throw new Error('Too big n for this function');
    var x = "0000000000" + Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(36);
    return x.slice(-n);
  }

  /*
  * Social medial login code here
  * Added relevant function 
  * By: Pankaj
  * Created: 30.Sept.2019
  */

 
  /* Social login event 
  * fired after click on button
  */
  
  initiateSocialLogin(loginType) {
    let provider_id = '';
    if(loginType==='google'){
      provider_id = GoogleLoginProvider.PROVIDER_ID;
    }else{
      provider_id = FacebookLoginProvider.PROVIDER_ID;
    }
    this.authService.signIn(provider_id).then(user => {
      let reqObj = {
        name: user.name,
        email: user.email,
        profile_image: user.photoUrl,
        socialToken: user.authToken,
        loginType: loginType,
      }
      this.userRegister(reqObj).then( (res: any) => {
        this.cs.showAlert('success', 'Logged in successfully');
        this.applyLogin(res.data);      
      }).catch(err => {
        this.cs.showAlert('error', err);
      });
    })
  }

   /* Check user by email */
   userRegister(data) {
    return new Promise((resolve, reject) => {
      this.cs.post('user/socialRegister', data).subscribe( res => {
        resolve(res);     
      }, error => { 
        reject(error)  
      });
    })
  }

  applyLogin(data){
    if(data.role==1 || data.role==2){
      this.cs.showAlert('success', data.message);
      this.router.navigate(['admin/dashboard']);
      //this.router.navigate(['vendors/profile/update/'+data._id]);
      localStorage.setItem('user-vndr', JSON.stringify(data));
    }
    else if(data.role==3){
      localStorage.setItem('user-vndr', JSON.stringify(data));
      this.router.navigate(['/']);
    }
  }


  // sendMessage() {
  //   this.chatService.sendMessage(this.message);
  //   this.message = '';
  // }

}
