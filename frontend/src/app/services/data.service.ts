import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject,Observable } from 'rxjs';

@Injectable()
export class DataService {

  private dataSource = new BehaviorSubject('');

  private editFilterSub = new BehaviorSubject<any>(null);

  currentMessage = this.dataSource.asObservable();
  private notify = new Subject<any>();
  /**
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();

  constructor() { }

  
  changeMessage(data: any) {
    this.dataSource.next(data)
  }

  onEditFilter() {
    return this.editFilterSub;
  }

  editFilter(filter){ 
    this.editFilterSub.next(filter)
  }

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  setCart(cartCount:any,cartCountKey: string) {
    this.notify.next({ cartCount: cartCount,cartCountKey: cartCountKey });
    }
  getCart(): Observable<any> {
      return this.notify.asObservable();
  }
}
