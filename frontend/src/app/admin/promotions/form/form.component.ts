import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
 import { CommonService } from '../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-update',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {
  promoForm: FormGroup;
  isEditable: boolean = false;
  isSubmited: boolean = false;
  promoId:String;
  now = new Date();
  constructor(
    public cs: CommonService,
    private fb: FormBuilder,
    public router: Router,
    private _location: Location,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.promoId = params['id'];
      if(this.promoId){
        this.isEditable = true;
        this.getById();
      }
    });
    this.promoForm = this.fb.group({   // Signup form
      code: ['', [Validators.required, Validators.maxLength(20)]],
      expiryDate:['', [Validators.required]],
    });
  }
  async getById() {
    let path = 'promotion/get';
    return new Promise((resolve, reject) => {
      this.cs.getById(path,this.promoId).subscribe(async data => {        
        var obj={
          code:data.data.code,
          expiryDate:new Date(data.data.expiryDate),
        }
        this.promoForm.patchValue(obj);
      },
      (err) =>{  
        this.cs.showAlert('warn', "Something went Wrong!");
        this._location.back();
       }
      );
    });
  }

  save(){
    if (this.promoForm.invalid) {
      this.isSubmited = true;
      return;
    }
    if(this.promoId){
      this.update();
    }else{
      this.add();
    }
  }

  add() {
    let path = 'promotion/create';
      this.cs.post(path,this.promoForm.value).subscribe(res=> {
        if (res.status == 200) {
          this.cs.showAlert('success', res.message);
          this.router.navigate(['/admin/promotions'])
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
    let path = `promotion/update/${this.promoId}`;
    this.cs.put(path,this.promoForm.value).subscribe(res=> {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this.router.navigate(['/admin/promotions'])
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


