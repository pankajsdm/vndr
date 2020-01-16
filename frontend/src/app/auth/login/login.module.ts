import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { environment } from '../../../environments/environment';
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
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        MatButtonModule,
        MatInputModule,
        SocialLoginModule
    ],
    declarations: [LoginComponent],

    providers: [{
          provide: AuthServiceConfig,
          useFactory: socialConfigs
    }]
   /*  providers: [{
          provide: AuthServiceConfig,
          useFactory: provideConfig
    }] */
})
export class LoginModule {}
