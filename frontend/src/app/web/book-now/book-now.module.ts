import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookNowRoutingModule } from './book-now-routing.module';
import { BookNowComponent } from './book-now.component'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BookNowComponent],
  imports: [
    CommonModule,
    BookNowRoutingModule, 
    NgbModule
  ]
})
export class BooknowModule { }
