import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent} from './customer.component';
import { FormComponent} from './form/form.component';
import { ManageAddressComponent} from './manage-address/manage-address.component';
import { SaveAddressComponent } from './manage-address/save-address/save-address.component';

const routes: Routes = [
    { path: '',component: CustomerComponent },
    {path: 'edit', component: FormComponent},
    {path: 'manage-address', component: ManageAddressComponent},
    {path: 'add-address', component: SaveAddressComponent},
    {path: 'manage-address/:id', component: SaveAddressComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
