import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupVendorComponent } from './signup-vendor.component'
const routes: Routes = [{
  path: '', component: SignupVendorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupVendorRoutingModule { }
