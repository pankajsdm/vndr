import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { environment } from '../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';



/* configuration for social medial login */
export function socialConfigs() {  
  const config = new AuthServiceConfig([  
      {  
          id: FacebookLoginProvider.PROVIDER_ID,  
          provider: new FacebookLoginProvider(environment.facebook_app_id)  
      },  
      {  
          id: GoogleLoginProvider.PROVIDER_ID,  
          provider: new GoogleLoginProvider(environment.google_app_id)  
      } 
  ]);  
  return config;  
} 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SignupRoutingModule,
    MatButtonModule,
    MatInputModule,
    SocialLoginModule
  ],
  declarations: [SignupComponent],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: socialConfigs
  }]
})
export class SignupModule { }
