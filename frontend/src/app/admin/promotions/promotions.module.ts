import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';

import { PromotionsComponent } from './promotions.component'
import { PromotionsRoutingModule } from './promotions-routing.module';
import { FormComponent } from './form/form.component';

//Ng prime module
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [PromotionsComponent, FormComponent],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    NgbCarouselModule,
    NgbAlertModule,
    StatModule,
    NgbDropdownModule,
    TranslateModule,
    PaginatorModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class PromotionsModule { }
