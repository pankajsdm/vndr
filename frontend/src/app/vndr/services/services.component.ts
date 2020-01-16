import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { routerTransition } from '../../router.animations';
import { CommonService } from './../../shared/services/common.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  animations: [routerTransition()]
})
export class ServicesComponent implements OnInit, OnDestroy {

  serviceArr: any;
  public rowsOnPage = environment.LIMIT;
  public activePage = 1;
  public recordCounts = 0;
  searchInput: string;
  searchInputUpdate = new Subject<string>();
  vndrUer: any;

  constructor(
    private formBuilder: FormBuilder,
    public cs: CommonService,
  ) {
  }


  ngOnInit() {
   
    this.vndrUer = JSON.parse(localStorage.getItem('user-vndr'));
    this.fetch();
    this.keyUpSearch();
  }

  keyUpSearch(){
    this.searchInputUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(keyword => {
        this.fetch(keyword)
    });
  }



  deleteService(id) {
    this.cs.delete(`service/delete/${id}`, '').subscribe(res => {
      this.fetch();
      this.cs.showAlert('warn', res.message);
    },
      error => {
        this.cs.showAlert('warn', error);
      });
  }


  deletePrompt(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This service can not be recovered later!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        this.deleteService(id);
      }
    });
  }

  fetch(searchInput="") {
    const path = 'service/getAll';
    const options = {
      page: this.activePage,
      count: this.rowsOnPage,
      search: searchInput,
    };
    this.cs.queryParams(path, options).subscribe(res => {
      if (res.status === 200) {
        this.serviceArr = res.data.data;
        this.recordCounts = res.data.count;
      } else {
        this.cs.showAlert('warn', res.message);
      }
    },
      error => { });
  }

  paginate(event) {
    this.activePage = event.page + 1;
    this.rowsOnPage = event.rows;
    this.fetch();
  }


  /* getServices(): void {
    this.cs.get('service/getAll').subscribe(res => {
      if (res.status === 200) {
        this.serviceArr = res.data.data;
        this.recordCounts = res.data.count;
      } else {
        this.cs.showAlert('warn', res.message);
      }
    },
      error => {
        this.cs.showAlert('warn', error);
      });
  } */

  ngOnDestroy(){
    this.cs.get('common/removeTemp/items').subscribe(res => {
      if (res.status === 200) {
      }
    },error => {});
  }


}
