import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
 import { CommonService } from './../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../../../environments/environment'
import {Location} from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {
  url = environment.apiUrl + 'common/upload';
  subCategoryForm: FormGroup;
  isEditable: boolean = false;
  imgRequired:boolean=false
  isSubmited: boolean = false;
  Id:String;
  categoryArr: any;
  constructor(
    public cs: CommonService,
    private fb: FormBuilder,
    public router: Router,
    private _location: Location,
    private activatedRoute: ActivatedRoute
    
    ) {}

  ngOnInit() {
    this.getCategory();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.Id = params['id'];
      if(this.Id){
        this.isEditable = true;
        this.getById();
      }
    });
    this.subCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      categoryId:['', [Validators.required]],
      description:['', [Validators.required]],
    });
  }

  getCategory(): void {
    this.cs.get('subcategory/getCategoriesList').subscribe( res => {
      if (res.status == 200) {
        this.categoryArr = res.data;
        if(this.categoryArr && this.categoryArr.length>0)
        this.subCategoryForm.controls['categoryId'].setValue(this.categoryArr[0]._id, {onlySelf: true});
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
  
  async getById() {
    let path = 'subcategory/get';
    return new Promise((resolve, reject) => {
      this.cs.getById(path,this.Id).subscribe(async res => {  
        var obj={
          categoryId:res.data.categoryId,
          name:res.data.name,
          description:res.data.description,
        }
        this.subCategoryForm.patchValue(obj);
      },
      (err) =>{  
        this.cs.showAlert('warn', "Something went Wrong!");
        this._location.back();
       }
      );
    });
  }

  save(){
    if (this.subCategoryForm.invalid) {
      this.isSubmited = true;
      return;
    }
    if(this.Id){
      this.update();
    }else{
      this.add();
    }
  }

  add() {
    let path = 'subcategory/create';
      this.cs.post(path,this.subCategoryForm.value).subscribe(res=> {
        if (res.status == 200) {
          this.cs.showAlert('success', res.message);
          this.router.navigate(['/admin/sub-categories'])
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

  update() {
    let path = `subcategory/update/${this.Id}`;
    this.cs.put(path,this.subCategoryForm.value).subscribe(res=> {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this.router.navigate(['/admin/sub-categories'])
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


