import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonService } from './../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../../environments/environment'
import { DataService } from '../../services/data.service';
import { Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  url = environment.apiUrl + 'common/upload';
  uploadedFiles: any[] = [];
  imgArray: any = [];
  userForm: FormGroup;
  isEditable: boolean = false;
  isSubmited: boolean = false;
  filename:any;
  Id:String;
  formated_address: string = "";
  userDetails:any;
  sectionArr:any = {
    data:[]
  };
  locationObj:any;
  imgRequired:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    public cs: CommonService,
    private fb: FormBuilder,
    public router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
    ) {}

ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user-vndr'));
    this.Id=user._id;    
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']){
        this.Id = params['id'];
        this.isEditable = true;
      }
      this.getById();   
    });
  
  this.userForm = this.fb.group({
      companyName:['', [Validators.required]],
      phoneNumber:['', [Validators.required]],
      aboutMe:['', [Validators.required]],
      geoLocation:['', []],
      numberOfBooking: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  getById():void {
    let path = 'user/detail';
    this.cs.getById(path,this.Id).subscribe(async res => {  
      this.userDetails = res.data;
      if(this.userDetails.image){
        this.filename = `${environment.backendUrl}users/${this.Id}/350x220/${this.userDetails.image}`;
      }else{
        this.filename = "";
      }
      
      if(this.userDetails.geoLocation){
        this.formated_address = this.userDetails.geoLocation.formattedAddress?this.userDetails.geoLocation.formattedAddress:"";
      }
      
      var obj={
        companyName: res.data.companyName,
        phoneNumber: res.data.phoneNumber,
        aboutMe: res.data.aboutMe,
        numberOfBooking: res.data.numberOfBooking,
      }
      this.userForm.patchValue(obj);
    }, error => {
      this.cs.showAlert('warn', error);
    });
  }

  onAutocompleteSelected(results: PlaceResult) {    
      if (results&&results.formatted_address) {
        this.formated_address = results.formatted_address;
        this.locationObj = {
              location: [results.geometry.location.lng(), results.geometry.location.lat()],
              formattedAddress: results.formatted_address
          }
      }
  }

  save(){
    if (this.userForm.invalid) {
      this.isSubmited = true;
      return;
    }   
    this.update();   
  }

  update() {
    let path = `user/update/${this.Id}`;    
    this.userForm.value.geoLocation=this.locationObj?this.locationObj:this.userDetails.geoLocation;   
    this.cs.put(path,this.userForm.value).subscribe(res=> {
      if (res.status == 200) {
        this.cs.showAlert('success', res.message);
        this.router.navigate(['/vendors/profile'])
      } else {
        this.cs.showAlert('warn', res.message);
      }      
    }, error => {
      this.cs.showAlert('warn', error);
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
    this.cs.put(`user/updateUserByField/${this.Id}`, {image: image}).subscribe(res => {
      let userVndr = JSON.parse(localStorage.getItem('user-vndr'));
      userVndr['image'] = image;
      localStorage.setItem('user-vndr', JSON.stringify(userVndr));
      let changeBehaviourSubject = {
        type: 'updated_profile_pic',
        data: { url: tempUrl}
      };
      this.dataService.changeMessage(changeBehaviourSubject);
      this.cs.showAlert('success', res.message);
    }, error => {
      this.cs.showAlert('warn', error);
    });
  }

  ngOnDestroy(){
    this.cs.get('common/removeTemp/users').subscribe(res => {
      if (res.status === 200) {
      }
    },error => {});
  }

}


