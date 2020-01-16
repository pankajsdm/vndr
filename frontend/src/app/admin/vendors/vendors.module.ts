import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';
import { FormComponent } from './form/form.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [VendorsComponent, FormComponent],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    CommonModule,
    NgbCarouselModule,
    NgbAlertModule,
    StatModule,
    NgbDropdownModule,
    TranslateModule,
    PaginatorModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ]
})
export class VendorsModule { }
