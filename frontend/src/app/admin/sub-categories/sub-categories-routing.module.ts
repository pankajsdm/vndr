import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoriesComponent } from './sub-categories.component';
import { FormComponent} from './form/form.component';

const routes: Routes = [
  { path: '', component: SubCategoriesComponent },
  {path: 'add', component: FormComponent},
  {path: 'update/:id', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoriesRoutingModule { }
