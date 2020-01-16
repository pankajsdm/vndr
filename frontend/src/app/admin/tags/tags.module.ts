import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

//Ng prime module
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [TagsComponent, FormComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    CommonModule,
    TranslateModule,
    PaginatorModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ]
})
export class TagsModule { }
