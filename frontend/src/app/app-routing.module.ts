import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard, SecureInnerPagesGuard, VendorGuard, AdminGuard} from './shared';
const routes: Routes = [
    { path: '', loadChildren: () => import('./web/web.module')
    .then(m => m.WebModule)},

    { path: 'vendors', loadChildren: () => import('./vndr/vndr.module')
    .then(m => m.VndrModule), canActivate: [VendorGuard] },

    { path: 'admin', loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule), canActivate: [AdminGuard] },

    { path: 'login', loadChildren: () => import('../app/auth/login/login.module')
        .then(m => m.LoginModule), canActivate: [SecureInnerPagesGuard] },

    { path: 'signup', loadChildren: () => import('../app/auth/signup/signup.module')
    .then(m => m.SignupModule), canActivate: [SecureInnerPagesGuard] },

    { path: 'signup-vendor', loadChildren: () => import('../app/auth/signup-vendor/signup-vendor.module')
    .then(m => m.SignupVendorModule), canActivate: [SecureInnerPagesGuard] },

    { path: 'email-verification/:token', loadChildren: () => import('../app/auth/verify-email/verify-email.module')
    .then(m => m.VerifyEmailModule)},

    { path: 'forgot-password', loadChildren: () => import('../app/auth/forgot-password/forgot-password.module')
    .then(m => m.ForgotPasswordModule), canActivate: [SecureInnerPagesGuard] },

    { path: 'reset-password/:id', loadChildren: () => import('../app/auth/reset-password/reset-password.module')
    .then(m => m.ResetPasswordModule), canActivate: [SecureInnerPagesGuard] },

    { path: 'error', loadChildren: () => import('./server-error/server-error.module')
    .then(m => m.ServerErrorModule) },
    
    { path: 'coming-soon', loadChildren: () => import('./coming-soon/coming-soon.module')
    .then(m => m.ComingSoonModule) },

    { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module')
    .then(m => m.AccessDeniedModule) },

    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module')
    .then(m => m.NotFoundModule), canActivate: [SecureInnerPagesGuard]  },

    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}