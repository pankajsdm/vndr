import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web.component'

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
        { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
        { path: 'category/:id', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
        { path: 'vendor/:slug', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule) },
        { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
        { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
        { path: 'item/:slug', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) },
        { path: 'become-a-customer', loadChildren: () => import('./become-a-customer/become-a-customer.module').then(m => m.BecomeACustomerPageModule) },
        { path: 'book-now/:name', loadChildren: () => import('./book-now/book-now.module').then(m => m.BooknowModule) },
        { path: 'become-a-vendor', loadChildren: () => import('./become-a-vendor/become-a-vendor.module').then(m => m.BecomeAVendorModule) },
        { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
