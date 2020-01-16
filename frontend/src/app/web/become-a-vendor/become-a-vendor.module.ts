import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecomeAVendorRoutingModule } from './become-a-vendor-routing.module';
import { BecomeAVendorComponent } from './become-a-vendor.component';

@NgModule({
  declarations: [BecomeAVendorComponent],
  imports: [
    CommonModule,
    BecomeAVendorRoutingModule
  ]
})
export class BecomeAVendorModule { }
