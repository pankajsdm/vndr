import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DataService } from '../app/services/data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { environment } from '../environments/environment';
import { MessageService} from 'primeng/api';
import { CommonService } from './shared/services/common.service';
import { ChatService } from './shared/services/chat.service';
import { BasicAuthInterceptor } from './shared/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/reducers/index';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ToastModule,
        StoreModule.forRoot(reducers),
        NgxSpinnerModule,
        AngularFontAwesomeModule,
        AgmCoreModule.forRoot({
            apiKey: environment.GOOGLE_API_KEY,
            libraries: ['places']
          }),
       MatGoogleMapsAutocompleteModule.forRoot()
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        MessageService,
        CommonService,
        ChatService,
        DataService,
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
