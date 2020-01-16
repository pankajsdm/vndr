import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    CarouselModule,
    FormsModule
  ]
})
export class ItemModule { }
