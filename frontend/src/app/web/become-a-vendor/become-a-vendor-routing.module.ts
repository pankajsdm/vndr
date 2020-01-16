import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BecomeAVendorComponent}  from './become-a-vendor.component'
const routes: Routes = [
  {
    path: '',
    component: BecomeAVendorComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeAVendorRoutingModule { }
