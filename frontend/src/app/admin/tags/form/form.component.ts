import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  TagForm: FormGroup;
  tags: any = [];
  results: string[];
  tagSectionId:String;
  isEditable: boolean = false;
  isSubmited:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public cs: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.TagForm = this.formBuilder.group({
      name: [''],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.tagSectionId = params['id'];
      if(this.tagSectionId){
        this.isEditable = true;
        this.getAllTags(this.tagSectionId);
      }
    });

  }
  

  onKeyUp(event) {
    if (event.key == "Enter") {
     let tokenInput = event.srcElement as any;
     if (tokenInput.value) {
      this.tags.push({name:tokenInput.value});
      tokenInput.value = "";
     }
    }
  }

  getAllTags(id){
    this.cs.get(`tag/get/${id}`).subscribe( res => {
      if(res.data.tags && res.data.tags.length>0){
        this.tags = res.data.tags;
        this.TagForm.controls['name'].setValue(res.data.name);
      }
    },
    error => { 
      this.cs.showAlert('warn', error);
    });
  }

  search() {
    this.results = [];
  }

  submitForm(){
    this.isSubmited = true;
    if (this.tags.length==0) {
      this.cs.showAlert('warn', 'Please choose tag fist. Tag can be added in Tags section.');
    }else{
      this.TagForm.value['tags'] = this.tags;
      if(this.isEditable){
        this.updateTagSection(this.tagSectionId, this.TagForm.value);
      }else{
        this.createTagSection(this.TagForm.value);
      }
    }
  }

  createTagSection(data){
    this.cs.post('tag/create', data).subscribe( res => {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this.router.navigate(['/admin/tags'])
      } else {
        this.cs.showAlert('warn', res.message);
      }
    },
    error => { 
      this.cs.showAlert('warn', error);
    });
  }

  updateTagSection(id, data){
    this.cs.put(`tag/update/${id}`, data).subscribe( res => {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this.router.navigate(['/admin/tags'])
      } else {
        this.cs.showAlert('warn', res.message);
      }
    },
    error => { 
      this.cs.showAlert('warn', error);
    });
  }

}
