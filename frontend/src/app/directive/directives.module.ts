import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorsDirective } from './custom-validators.directive';


@NgModule({
    imports: [CommonModule],
    declarations: [CustomValidatorsDirective],
    providers: [CustomValidatorsDirective],
    exports: [CustomValidatorsDirective]
  })
  export class DirectivesModule { }