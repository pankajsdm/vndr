import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { landingRoutingModule } from './become-a-customer-routing.module';
import { BecomeACustomerComponent } from './become-a-customer.component'; 

@NgModule({
  declarations: [BecomeACustomerComponent], 
  imports: [
    CommonModule,
    landingRoutingModule 
  ]
})
export class BecomeACustomerPageModule { } 
