import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthenticationService } from '@app/_services';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    // constructor(private authenticationService: AuthenticationService) { }
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userData = <any>JSON.parse(localStorage.getItem('user-vndr'));
        if (userData && userData.loginToken) {
            request = request.clone({
                setHeaders: { 
                    authorization: `${userData.loginToken}`
                }
            });
        }

        return next.handle(request);
    }
}