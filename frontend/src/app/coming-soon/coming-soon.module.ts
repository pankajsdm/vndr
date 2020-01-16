import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CountdownModule } from 'ngx-countdown';
import { ComingSoonRoutingModule } from './coming-soon-routing.module';
import { ComingSoonComponent } from './coming-soon.component';

@NgModule({
  imports: [
    CommonModule,
    ComingSoonRoutingModule,
    //CountdownModule
  ],
  declarations: [ComingSoonComponent]
})
export class ComingSoonModule { }
