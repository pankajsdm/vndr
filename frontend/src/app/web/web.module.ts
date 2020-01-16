import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './_sub/header/header.component';
import { FooterComponent } from './_sub/footer/footer.component';
import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WebComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    NgbModule
  ]
})
export class WebModule { }
