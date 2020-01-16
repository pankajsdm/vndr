import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { countries } from '../_json_files/countries';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(

    public router: Router,
    private http: HttpClient,
    private _location: Location,
    private messageService: MessageService) {
  }

  get(path, loader = true) {
    this.loading(loader);
    return this.http.get<any>(`${environment.apiUrl}${path}`)
      .pipe(map(res => {
        this.loading(false);
        return res;
      }));
  }

  put(path, body, loader = true) {
    this.loading(loader);
    return this.http.put<any>(`${environment.apiUrl}${path}`, body)
      .pipe(map(res => {
        this.loading(false);
        return res;
      }));
  }

  post(path, body, loader = true) {
    this.loading(loader);
    return this.http.post<any>(`${environment.apiUrl}${path}`, body)
      .pipe(map(res => {
        this.loading(false);
        return res;
      }));
  }

  delete(path, body, loader = true) {
    this.loading(loader);
    return this.http.delete<any>(`${environment.apiUrl}${path}`)
      .pipe(map(res => {
        this.loading(false);
        return res;
      }));
  }

  queryParams(path, options, loader = true) {
    const params = new URLSearchParams();
    for (const key in options) { params.set(key, options[key]) }
    this.loading(loader);
    return this.http.get<any>(`${environment.apiUrl}${path}?${params}`)
      .pipe(map(res => {
        this.loading(false);
        return res;
      }));
  }

  getById(path, body, loader = true) {
    this.loading(loader);
    return this.http.get<any>(`${environment.apiUrl}${path}/${body}`)
      .pipe(map(res => {
        this.loading(false);
        return res;
      }));
  }

  showAlert(type, message) {
    this.messageService.add({ severity: type, detail: message });
    if (message == 'Session Expired.') { this.logout(); }
  }



  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-vndr'));
    return (user) ? true : false;
  }

  loading(value = false) {
    this.isLoading.next(value);
  }

  back() {
    this._location.back();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  
 getLocation(latLong) {
  return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLong}&key=${
    environment.GOOGLE_API_KEY}`)
  .pipe(map(res => {
    this.loading(false);
    return res;
  }));
  } 
}
