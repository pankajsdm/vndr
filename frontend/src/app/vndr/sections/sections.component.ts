import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './../../shared/services/common.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/reducers';
import { environment } from '../../../environments/environment'
import Swal from 'sweetalert2' 
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  user: any;
  public rowsOnPage: number   = environment.LIMIT;
  public activePage: number   = 1;
  public totalRecords: number = 0;
  public arrayObj: object     = [];
  public search: any          = '';

  searchInput: string;
  searchInputUpdate = new Subject<string>();
  dataStripe = {
        country: 'US',
        currency: 'usd',
        routing_number: '110000000',
        account_number: '000123456789',
        account_holder_name: 'Jenny Rosen',
        account_holder_type: 'individual'
  };

  constructor(
    public router: Router,
    public cs: CommonService,
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
    let path = 'section/getAll';
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
    error => { });
  }

  remove(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Related Items with Section will also be removed and will not be recovered',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let path = `section/delete/${id}`;
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
    })
  }

  updateStatus(obj) {
      let path = `section/updateStatus/${obj._id}`;
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
