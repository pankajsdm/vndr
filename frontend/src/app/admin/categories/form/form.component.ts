import { Component, OnInit } from '@angular/core';
 import { routerTransition } from '../../../router.animations';
 import { CommonService } from './../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { environment } from 'src/environments/environment.prod';
import { environment } from './../../../../environments/environment'
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';


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
  categoryForm: FormGroup;
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
    private _location: Location,
    public sanitizer: DomSanitizer
    ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.Id = params['id'];
      if(this.Id){
        this.isEditable = true;
        this.getById();
      }
    });
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description:['', [Validators.required]],
      image: new FormControl(''),
      attachment: new FormControl('')
    });
  }



  /* Get category by id */
  async getById() {
    let path = 'category/get';
    return new Promise((resolve, reject) => {
      this.cs.getById(path,this.Id).subscribe(async res => {
        if (res.status == 200) {
          var obj = {
            name:res.data.name,
            image:res.data.image,
            description:res.data.description,
            attachment: `${environment.backendUrl}categories/${this.Id}/${res.data.image}`,
          }
          this.categoryForm.patchValue(obj);
        } else {
          this.cs.showAlert('warn', res.message);
          this._location.back(); 
        }
      },
      (err) =>{  
        this.cs.showAlert('warn', "Something went Wrong!");
        this._location.back();
       }
      );
    });
  }
  
  /* create category */
  save(){
    this.isSubmited = true;
    if (this.categoryForm.valid) {
      if(this.categoryForm.value.image==""){
        this.imgRequired = true;
      }else{
        if(this.Id){
          this.update();
        }else{
          this.add();
        }
      }
    }
  }

  /* create category */
  add() {
    let path = 'category/create';
    this.categoryForm.value['slug'] = this.createSlug(this.categoryForm.value.name);
    this.cs.post(path,this.categoryForm.value).subscribe(res=> {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this.router.navigate(['/admin/categories'])
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

  /* Update category with id */
  update() {
    let path = `category/update/${this.Id}`;
    this.cs.put(path,this.categoryForm.value).subscribe(res=> {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this.router.navigate(['/admin/categories'])
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

  /* Choose category file */
  onFileSelect(event, fileUpload) {
    const formData: FormData = new FormData();
    formData.append('imageLocation', 'categories')
    formData.append('images', event.files[0])   
    let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.files[0]));
    this.categoryForm.controls['attachment'].setValue(url);
    this.cs.post('common/upload', formData).subscribe(res => {
      if (res.status === 200) {
        this.imgRequired = false;
        this.categoryForm.controls.image.setValue(res.data.imgNameArray[0])
        fileUpload.clear();
      }
    },
    (err) =>{  
      this.cs.showAlert('warn', "Something went Wrong!");
      this._location.back();
      }); 
    fileUpload.clear();
  }

  /* Get slug of text */
  createSlug( str ) {
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
    str = str.replace(/^\s+|\s+$/gm,'');
    str = str.replace(/\s+/g, '-');	
    return str;
  }

  remSpecialChar(event){   
    var k;  
    k = event.charCode; 
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

}


