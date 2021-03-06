import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './_sub/sidebar/sidebar.component';
import { HeaderComponent } from './_sub/header/header.component';
import { FooterComponent } from './_sub/footer/footer.component';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';
import { environment } from '../../environments/environment';
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
  declarations: [
    AdminComponent, 
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule,
    NgbDropdownModule,
    PageHeaderModule,
    SocialLoginModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: socialConfigs
  }]
})
export class AdminModule { }
