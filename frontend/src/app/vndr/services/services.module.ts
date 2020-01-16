import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { FormComponent } from './form/form.component';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule} from 'primeng/calendar';
import { DirectivesModule } from '../../directive/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesRoutingModule,
    PaginatorModule,
    TableModule,
    FileUploadModule,
    AutoCompleteModule,
    CalendarModule,
    DirectivesModule
  ],
  declarations: [
    ServicesComponent,
    FormComponent
  ],
})
export class ServicesModule { }
