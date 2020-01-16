import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from './../../../shared/services/common.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../shared/reducers';
import { UserAction } from '../../../shared/actions/user';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() collapedSideBar: boolean = false;
    public pushRightClass: string;
    public user: any;
    public logiUser: any;
    public amount$: object;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private authService: AuthService,
        public cs: CommonService,
        public store: Store<fromRoot.State>) {
        store.select(fromRoot.getUserState).subscribe(data => {
            this.user = data;
        });
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.logiUser = JSON.parse(localStorage.getItem('user-vndr'));
        this.store.dispatch(new UserAction(this.logiUser));
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }
    
    onLoggedout() { 
        this.cs.get('user/logout').subscribe(res => {
            this.cs.logout();
            this.cs.showAlert('success', 'Logout successfully...');
        },error => {
            console.log('error in deleting file');
        });
    }

    changeLang(language: string) {
        this.translate.use(language);
    }    
}
