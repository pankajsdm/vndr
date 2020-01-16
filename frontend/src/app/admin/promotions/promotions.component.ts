import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { CommonService } from './../../shared/services/common.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/reducers';
import { environment } from '../../../environments/environment'
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  animations: [routerTransition()]
})
export class PromotionsComponent implements OnInit {

  user: any;
  public rowsOnPage: number   = environment.LIMIT;
  public activePage: number   = 1;
  public totalRecords: number = 0;
  public arrayObj: object     = [];
  public search: any          = '';
  searchInput: string;
  searchInputUpdate = new Subject<string>();

  constructor(
    public router: Router,
    public cs: CommonService,
    private _location: Location,
    public store: Store<fromRoot.State>) {
      store.select(fromRoot.getUserState).subscribe(data => {
          this.user = data;
      });
    }

  ngOnInit() {
    this.fetch();
    this.keyUpSearch();
  }

 

  paginate(event) {
    this.activePage = event.page + 1;
    this.rowsOnPage = event.rows;
   this.fetch();
  }
  keyUpSearch(){
    this.searchInputUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(keyword => {
        this.fetch(keyword)
    });
  }

  fetch(searchInput="") {
    let path = 'promotion/getAll';
    let options = {
      page: this.activePage,
      count: this.rowsOnPage,
      search:searchInput
    };
    this.cs.queryParams(path, options).subscribe( res => {
      if (res.status == 200) {
        this.arrayObj = res.data.data;
        this.totalRecords = res.data.total;
      } else {
        this.cs.showAlert('warn', res.message);
      }
    },
    (err) =>{  
      this.cs.showAlert('warn', "Something went Wrong!");
      this._location.back();
     }
    );
  }

  remove(id) {
    if (confirm('Do you want to remove ?')) {
      let path = `promotion/delete/${id}`;
      this.cs.delete(path, {}).subscribe( res => {
        if (res.status == 200) {
          this.activePage = 1;
          this.fetch();
        } else {
          this.cs.showAlert('warn', res.message);
        }
      },
      (err) =>{  
        this.cs.showAlert('warn', "Something went Wrong!");
        this._location.back();
       }
      );
    }
  }

  updateStatus(obj) {
      let path = `promotion/updateStatus/${obj._id}`;
      let body = {_id: obj._id,isActive : obj.isActive ? false : true};
      this.cs.put(path, body).subscribe( res => {
        if (res.status == 200) {
          this.activePage = 1;
          this.fetch();
        } else {
          this.cs.showAlert('warn', res.message);
        }
      },
      (err) =>{  
        this.cs.showAlert('warn', "Something went Wrong!");
        this._location.back();
       }
      );
  }

}
