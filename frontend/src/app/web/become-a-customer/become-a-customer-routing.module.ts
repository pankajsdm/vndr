import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BecomeACustomerComponent} from './become-a-customer.component';

const routes: Routes = [
  {
    path: '',
    component: BecomeACustomerComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class landingRoutingModule { }
 