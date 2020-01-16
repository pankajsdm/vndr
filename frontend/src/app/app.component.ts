import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from "./shared/services/common.service"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    public isLoading: boolean = false;

    constructor(
        private spinner: NgxSpinnerService,
        private cs: CommonService) {
            this.cs.isLoading.subscribe( value => {
                if(value) this.spinner.show();
                else this.spinner.hide();
            });
    }

    ngOnInit() {
        // this.spinner.show();
    }
}
