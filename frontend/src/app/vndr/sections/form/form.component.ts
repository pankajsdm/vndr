import { Component, OnInit, ViewChild } from '@angular/core';
 import { routerTransition } from '../../../router.animations';
 import { CommonService } from './../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { environment } from 'src/environments/environment.prod';
import { environment } from './../../../../environments/environment'
import { Location} from '@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {
  url = environment.apiUrl + 'common/upload';
  uploadedFiles: any[] = [];
  imgArray: any = [];
  sectionForm: FormGroup;
  isEditable: boolean = false;
  isSubmited: boolean = false;
  filename:String="";
  Id:String;
  imgRequired:boolean=false
  fileData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    public cs: CommonService,
    private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private _location: Location
    ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.Id = params['id'];
      if(this.Id){
        this.isEditable = true;
        this.getById();
      }
    });
    this.sectionForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description:['', [Validators.required]]
    });
  }


  /* Get section by id */
  async getById() {
    let path = 'section/get';
    return new Promise((resolve, reject) => {
      this.cs.getById(path,this.Id).subscribe(async res => {  
        var obj = {
          name:res.data.name,
          description:res.data.description,
          image:res.data.image,
        }
        this.sectionForm.patchValue(obj);
      });
    });
  }
  
  /* create section */
  save(){
    this.isSubmited = true;
    if (this.sectionForm.valid) {
      if(this.Id){
        this.update();
      }else{
        this.add();
      }
    }
  }

  /* create section */
  add() {
    let path = 'section/create';
    this.cs.post(path,this.sectionForm.value).subscribe(res=> {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this._location.back();
      } else {
        this.cs.showAlert('warn', res.message);
      }
    });
  }

  /* Update section with id */
  update() {
    let path = `section/update/${this.Id}`;
    this.cs.put(path,this.sectionForm.value).subscribe(res=> {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this._location.back();
      } else {
        this.cs.showAlert('warn', res.message);
      }
    });
  }



}


