import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'primeng/fileupload';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DirectivesModule } from '../../directive/directives.module';
import { StatModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskModule } from 'primeng/inputmask';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
 
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbCarouselModule,
    NgbAlertModule,
    StatModule,
    NgbDropdownModule,
    TranslateModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    DirectivesModule,
    MatGoogleMapsAutocompleteModule
  ],
  declarations: [
    ProfileComponent, 
    ChangePasswordComponent
  ],
})
export class ProfileModule { }
