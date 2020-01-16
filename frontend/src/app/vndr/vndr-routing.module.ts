import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VndrComponent } from './vndr.component';
const routes: Routes = [
  {
    path: '',
    component: VndrComponent,
    children: [
        { path: '', redirectTo: '', pathMatch: 'prefix' },
        { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'sections', loadChildren: () => import('./sections/sections.module').then(m => m.SectionsModule) },       
        { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
        { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VndrRoutingModule { }
