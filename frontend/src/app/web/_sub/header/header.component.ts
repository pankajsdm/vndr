
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CommonService } from './../../../shared/services/common.service';
import { DataService } from './../../../services/data.service'
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap'
@Component({
    selector: 'app-web-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [NgbModal]
})
export class HeaderComponent implements OnInit {

  title = 'Your Orders';
  subTitle = '';
  closeResult: string;
  modalOptions:NgbModalOptions;
  cartArr:any;
  mediaCss = false;
  loginUser: any;
  cartCount=0;
  constructor(
    public cs: CommonService,
    public ds: DataService,
    private modalService: NgbModal,
    public router: Router,
  ) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
   }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('user-vndr'));
    this.cartArr = JSON.parse(localStorage.getItem("cart"));
    if(this.cartArr !=null && this.cartArr.length>0){
      this.cartCount=this.cartArr.length;
      console.log("this.cartArr",this.cartCount);
    }    
    this.ds.getCart().subscribe(data => {
      if (data.cartCountKey == 'cartCount') {
        this.cartCount = data.cartCount;
      }
    });
  }

  mediaFunction(mediaCssChange){
    this.mediaCss=!mediaCssChange;
  }

  onLoggedout() { 
    this.cs.get('user/logout').subscribe(res => {
        this.cs.logout();
        this.cs.showAlert('success', 'Logout successfully...');
    },error => {
        console.log('error in deleting file');
    });
  }

  open(content) {    
    this.cartArr = JSON.parse(localStorage.getItem("cart"));
    this.modalService.open(content, this.modalOptions).result.then((result) => {
          if(result=='login'){
            this.router.navigate(['/admin/categories'])
          }
    }, (reason) => {
      console.log("reason",reason);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  saveCat(ree){
    alert(ree);
   
    
  }

}

