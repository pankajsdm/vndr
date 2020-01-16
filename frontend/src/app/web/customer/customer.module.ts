import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { FormComponent } from './form/form.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { SaveAddressComponent } from './manage-address/save-address/save-address.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [CustomerComponent, FormComponent, ManageAddressComponent, SaveAddressComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatGoogleMapsAutocompleteModule
  ]
})
export class CustomerModule { }
