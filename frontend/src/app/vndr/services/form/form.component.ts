import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-service',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {

  serviceForm: FormGroup;
  items: FormArray;
  isEditable: boolean = false;
  getPackageItem: any = [];
  categoryArr: any;
  sectionArr: any;
  issubCategoryArr=false;
  subCategoryArr: any;
  _id = '';
  packageIndex = [];
  uploadedFiles: any[] = [];
  files: any;
  url = environment.apiUrl + 'common/upload';
  fileData = new FormData();
  filesArray: File[] = [];
  imgArray: any = [];
  isSubmitted: boolean = false;
  tags: string[] = [];
  results: string[];
  paths:any = [];
  minDate = new Date();
  minToDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    public cs: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.serviceForm = this.formBuilder.group({
      sectionId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      attachment: new FormControl(''),
      image: new FormControl(''),
      items: this.formBuilder.array([this.createItem()])
    });
    this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];
    });
    
  }

  ngOnInit() {
    this.getSectionList();
    if (this._id) {
      this.isEditable = true;
      this.getItem();
    }
  }
  
  selectDate(frmDate) {
    this.minToDate = frmDate;
    return;
  }

  search() {
    this.results = [];
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key == "Enter") {
     let tokenInput = event.srcElement as any;
     if (tokenInput.value) {
      this.tags.push(tokenInput.value);
      tokenInput.value = "";
     }
    }
  }

  getSectionList(): void {
    this.cs.get('section/getAll').subscribe(res => {
      if (res.status === 200) {
        this.sectionArr = res.data.data;
        if(this.sectionArr.length>0){
          this.serviceForm.controls['sectionId'].setValue(this.sectionArr[0]._id, {onlySelf: true});
        }     
      } else {
        this.cs.showAlert('warn', res.message);
      }
    },
      error => {
        this.cs.showAlert('warn', error);
      });
  }

  
  getItem(): void {
    this.cs.get('service/get/' + this._id).subscribe(res => {
      if (res.status === 200) {
        const itemCount = res.data.items.length - 1;
        for (let i = 0; i < itemCount; i++) {
          this.addItem(); 
        }      
        res.data.attachment = `${environment.backendUrl}items/${this._id}/350x220//${res.data.image}`;
        res.data.items = res.data.items.map(res => {
          res.attachment = res.images.map(images => `${environment.backendUrl}packages/${this._id}/350x220/${images}`);
          return res;
        });
        this.serviceForm.patchValue(res.data);
        this.tags = res.data.tags;
        this.getPackageItem = res.data;
      } else {
        this.cs.showAlert('warn', res.message);
      }
    },
      error => {
        this.cs.showAlert('warn', error);
      });
  }

  /* create dynamic package items */
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      price: [0.01, Validators.required],
      desc: ['', Validators.required],
      attachment: new FormControl([]),
      images: new FormControl([])
    });
  }

  /* add package item */
  addItem(): void {
    this.items = this.serviceForm.get('items') as FormArray;
    this.items.push(this.createItem());
  } 

  /* remove package item */
  removeItem(index): void {
    if (this.items) {
      this.paths = [...this.paths, ...this.serviceForm.controls.items.value[index].images];
      this.items.removeAt(index);
    }
  }

  /* submit service along with items */
  submitForm(): void {
    this.isSubmitted = true;
    if (this.serviceForm.invalid) {
      this.cs.showAlert('warn', 'All fields are required');
      return;
    }
    if (this._id) {
      this.cs.put('service/update/' + this._id, this.serviceForm.value).subscribe(res => {
        if (res.status === 200) {
          this.cs.showAlert('success', 'Service updated successfully...');
          this.router.navigate(['/vendors/services']);
        } else {
          this.cs.showAlert('warn', res.message);
        }
      },
        error => {  
          this.cs.showAlert('warn', error);
        });
    } else {
      this.cs.post('service/create', this.serviceForm.value).subscribe(res => {
        console.log(res);
        if (res.status === 200) {
          this.cs.showAlert('success', 'Service created successfully...');
          this.router.navigate(['/vendors/services']);
        } else {
          this.cs.showAlert('warn', res.message);
        }
      },
        error => {
          this.cs.showAlert('warn', error);
        });
    }
  }

  /* Select image for items */
  chooseItemImage(event, fileUpload) {
    const formData: FormData = new FormData();
    formData.append('imageLocation', 'items')   
    let images = ['images'];
    for (let i = 0; i < event.files.length; i++) {
      formData.append('images', event.files[i]);
      let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.files[i]));
      this.serviceForm.controls['attachment'].setValue(url);
    }
    this.cs.post('common/upload', formData).subscribe(res => {
      if (res.status === 200) {
          this.serviceForm.controls['image'].setValue(res.data.imgNameArray[0]);
          fileUpload.clear();
      }
    },
    error => {
      this.cs.showAlert('warn', error);
    }); 
  }

  /* Select image for packages */
  choosePackageImage(event, index, fileUpload) {
    const formData: FormData = new FormData();
    formData.append('imageLocation', 'packages')   
    let images = ['images'];
    for (let i = 0; i < event.files.length; i++) {
      formData.append('images', event.files[i])
      let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.files[i]));
      this.serviceForm.controls.items.value[index].attachment.push(url);
    }
    this.cs.post('common/upload', formData).subscribe(res => {
      if (res.status === 200) {
        for(let j=0; j<res.data.imgNameArray.length; j++){
          this.serviceForm.controls.items.value[index].images.push(res.data.imgNameArray[j])
        }
      }
      fileUpload.clear();
    },
    error => {
      this.cs.showAlert('warn', error);
    });
  }

  


}
