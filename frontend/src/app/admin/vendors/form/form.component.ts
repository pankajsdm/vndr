import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
 import { CommonService } from '../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { promise } from 'protractor';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  vendorForm: FormGroup;
  isEditable: boolean = false;
  isSubmited: boolean = false;
  vendorId:String;
  results: any; 
  tags: any= [];
 

  constructor(
    public cs: CommonService,
    private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.vendorId = params['id'];
      if(this.vendorId){
        this.isEditable = true;
        this.edit(this.vendorId);
      }
    });
    this.vendorForm = this.fb.group({  
    });

  }

  edit(id) {
    return new Promise((resolve, reject) => {
      this.cs.getById('user/detail', id).subscribe(res => {  
        if(res.data.tags){
          let tags = res.data.tags.reduce((acc,value) => {
            acc.push({name: value});
            return acc;
          },[]);
          resolve(tags);
        }
      });
    }).then(tags => {
      this.tags = tags;
    })
  }

  search(event) {
    let query = event.query;
    this.cs.get('tag/getTags').subscribe(res => {      
      if(res.data.length>0){
        this.results = this.filteredTags(query, res.data);
      }
    },error => { 
      this.cs.showAlert('warn', error);
    });

  }

  filteredTags(query, data: any[]) {
    let filtered : any[] = [];
    for(let i = 0; i < data.length; i++) {
      let tags = data[i];
      if(tags.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(tags);
      }
    }
    return filtered;
  }



  save():void {
    this.isSubmited = true;
    if (this.tags.length>0) {
      this.updateTag(this.tags);
    }else{
      this.cs.showAlert('warn', 'Please choose tag fist. Tag can be added in Tags section.');
    }
  }


  updateTag(data) {
    return new Promise((resolve, reject) => {
      const tags =  data.reduce((acc, curr) => {
        acc.push(curr.name);
        return acc;
      },[]);
      resolve(tags);
    }).then(tags => {
      let path = `user/updateUserByField/${this.vendorId}`;
      this.cs.put(path, {tags: tags}).subscribe(res=> {
        if (res.status == 200) {
          this.cs.showAlert('success', res.message);
          this.router.navigate(['/admin/vendors'])
        } else {
          this.cs.showAlert('warn', res.message);
        }
      });
    });
  }

}


