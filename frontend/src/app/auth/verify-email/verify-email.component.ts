import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../shared/services/common.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  token:any;
  constructor( 
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public cs: CommonService) {

    this.activatedRoute.params.subscribe(params => {
      this.token = params.token;
    })

   }
 
  ngOnInit() {
    if(this.token){
      const obj={
        token:this.token
      }
      this.cs.put('user/email-verification',obj)
      .subscribe(res => {
          if (res.status == 200) {
            this.cs.showAlert('success', res.message);
            this.router.navigate(['/']); 
          }else {
            this.cs.showAlert('error', res.message);
            this.router.navigate(['/']); 
          }               
      }, error => { 
        this.cs.showAlert('error', error);
      });
  }
  }

}
