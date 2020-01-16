import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'primeng/fileupload';
import { DirectivesModule } from '../../directive/directives.module';
import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { SubCategoriesComponent } from './sub-categories.component';
import { FormComponent } from './form/form.component';

import { StatModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';

//Ng prime module
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';

@NgModule({
 
  imports: [
    CommonModule,
    SubCategoriesRoutingModule,
    NgbCarouselModule,
    NgbAlertModule,
    StatModule,
    NgbDropdownModule,
    TranslateModule,
    FileUploadModule,
    PaginatorModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  declarations: [
    SubCategoriesComponent, 
    FormComponent
  ],
})
export class SubCategoriesModule { }
