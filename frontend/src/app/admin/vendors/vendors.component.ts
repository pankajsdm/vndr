import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from './../../shared/services/common.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/reducers';
import { environment } from '../../../environments/environment'
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
  animations: [routerTransition()]
})
export class VendorsComponent implements OnInit {

  
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
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
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
    let path = 'user/getAll';
    let options = {
      role: '2',
      page: this.activePage,
      count: this.rowsOnPage,
      search:searchInput,
      key: 'companyName'
    };
    this.cs.queryParams(path, options).subscribe( res => {
      if (res.status == 200) {
        this.arrayObj = res.data.data;
        this.totalRecords = res.data.total;
      } else {
        this.cs.showAlert('warn', res.message);
      }
    },
    error => { });
  }

  remove(id) {
    if (confirm('Do you want to remove ?')) {
      let path = `user/delete/${id}`;
      this.cs.delete(path, {}).subscribe( res => {
        if (res.status == 200) {
          this.activePage = 1;
          this.fetch();
        } else {
          this.cs.showAlert('warn', res.message);
        }
      },
      error => { });
    }
  }

  updateStatus(obj) {
      let path = `user/updateStatus/${obj._id}`;
      let body = {_id: obj._id,isActive : obj.isActive ? false : true};
      this.cs.put(path, body).subscribe( res => {
        if (res.status == 200) {
          this.activePage = 1;
          this.fetch();
        } else {
          this.cs.showAlert('warn', res.message);
        }
      },
      error => { });
  }

}
