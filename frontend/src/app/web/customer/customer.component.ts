import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../shared/services/common.service';
import { environment } from './../../../environments/environment'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  loginUser: any;
  getUser: any = [];
  filename:any;

  constructor(
    public cs: CommonService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('user-vndr'));
    this.getProfile(this.loginUser._id);
  }

  getProfile(id):void {
    let path = 'user/detail';
    this.cs.getById(path,id).subscribe(async res => {
      this.getUser = res.data;
      if(this.getUser.image){
        this.filename = `${environment.backendUrl}users/${id}/350x220/${this.getUser.image}`;
      }else{
        this.filename = "";
      }
    });
  }

    /* Choose category file */
  onFileSelection(event, fileUpload) {
      const formData: FormData = new FormData();
      formData.append('imageLocation', 'users')   
      formData.append('images', event.files[0])
      this.filename = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.files[0]));
      this.cs.post('common/upload', formData).subscribe(res => {
        if(res.status==200){
          this.uploadProfilePicture(res.data.imgNameArray[0], this.filename);
        }
      },
      error => {
        this.cs.showAlert('warn', error);
      }); 
      fileUpload.clear();
  } 

  uploadProfilePicture(image, tempUrl){
    this.cs.put(`user/updateUserByField/${this.loginUser._id}`, {image: image}).subscribe(res => {
      let userVndr = JSON.parse(localStorage.getItem('user-vndr'));
      userVndr['image'] = image;
      localStorage.setItem('user-vndr', JSON.stringify(userVndr));
      this.cs.showAlert('success', res.message);
    }, error => {
      this.cs.showAlert('warn', error);
    });
  }

}
