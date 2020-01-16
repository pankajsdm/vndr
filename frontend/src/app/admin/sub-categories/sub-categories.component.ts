import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { CommonService } from './../../shared/services/common.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/reducers';
import { environment } from '../../../environments/environment'
import {Location} from '@angular/common'; 
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
  animations: [routerTransition()]
})
export class SubCategoriesComponent implements OnInit {

  
  user: any;
  public rowsOnPage: number   = environment.LIMIT;
  public activePage: number   = 1;
  public totalRecords: number = 0;
  public arrayObj: object     = [];
  public search: any          = '';
  public categoryArr: any;
  public categoryId:string="";
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
    this.getCategory();
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
  getCategory(): void {
    this.cs.get('subcategory/getCategoriesList').subscribe( res => {
      if (res.status == 200) {
        this.categoryArr = res.data;       
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
  getSelectedCategory(cat_id){
    this.categoryId="";
    if(cat_id && cat_id!='undefined'){
      this.categoryId=cat_id;
    }
    this.fetch();
  }
 

  paginate(event) {
    this.activePage = event.page + 1;
    this.rowsOnPage = event.rows;
   this.fetch();
  }

  fetch(searchInput="") {
    let path = 'subcategory/getAll';
    let options = {
      page: this.activePage,
      count: this.rowsOnPage,
      search:searchInput,
      categoryId:this.categoryId
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
      let path = `subcategory/delete/${id}`;
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
      let path = `subcategory/updateStatus/${obj._id}`;
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
