import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from './../../../shared/services/common.service';
import { Store } from '@ngrx/store';
import { environment } from './../../../../environments/environment'
import * as fromRoot from '../../../shared/reducers';
import { UserAction } from '../../../shared/actions/user';
import { AuthService, SocialUser } from 'angularx-social-login';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() collapedSideBar: boolean = false;
    public pushRightClass: string;
    public user: any;
    public loginUser: any;
    public amount$: object;
    subscription: Subscription = new Subscription();

    constructor(
        private translate: TranslateService,
        public router: Router,
        private data_service: DataService,
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
        this.loginUser = JSON.parse(localStorage.getItem('user-vndr'));
        if(this.loginUser.image){
            this.loginUser.image = `${environment.backendUrl}users/${this.loginUser._id}/350x220/${this.loginUser.image}`;
        }
       
        this.store.dispatch(new UserAction(this.loginUser));
        this.getSubscribed();
    }


    getSubscribed() {
        this.subscription =  this.data_service.currentMessage.subscribe((res:any) => {
            if(res && res.type=='updated_profile_pic') {
                this.loginUser.image = res.data.url;
            }
        })
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

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}
