import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
        { path: '', redirectTo: '', pathMatch: 'prefix' },
        { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'promotions', loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule) },
        { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
        { path: 'sub-categories', loadChildren: () => import('./sub-categories/sub-categories.module').then(m => m.SubCategoriesModule) },
        { path: 'vendors', loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule) },
        { path: 'tags', loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule) },
    ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
