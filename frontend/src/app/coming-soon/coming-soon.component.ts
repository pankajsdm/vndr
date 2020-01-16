import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  days:any;
  hours:any;
  minutes:any;
  seconds:any;
  constructor() { }

  ngOnInit() {
    setInterval(()=>{
      this.getTime();
    },1000)
  }

  getTime(){
    var dateFuture:any = new Date(new Date().getFullYear() +1, 0, 1);
    var dateNow:any = new Date();
    var seconds = Math.floor((dateFuture - (dateNow))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    this.days = Math.floor(hours/24);
    this.hours = hours-(this.days*24);
    this.minutes = minutes-(this.days*24*60)-( this.hours*60);
    this.seconds = seconds-(this.days*24*60*60)-( this.hours*60*60)-( this.minutes*60);
  }

}
