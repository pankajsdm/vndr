import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SignupVendorRoutingModule } from './signup-vendor-routing.module';
import { SignupVendorComponent } from './signup-vendor.component'
import { environment } from '../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SignupVendorRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatGoogleMapsAutocompleteModule
  ],
  declarations: [SignupVendorComponent],
  providers: []
})
export class SignupVendorModule { }
