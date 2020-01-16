import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ChatService } from './../../shared/services/chat.service';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  user:String;
  room:String;
  messageText:String;
  public socket = io(environment.backendUrl);  

  subscription: Subscription = new Subscription();
  messageArray:Array<{user:String,message:String}> = [];

  constructor(private _chatService: ChatService){
   
    this._chatService.newUserJoined().subscribe(data=> this.messageArray.push(data));
    this._chatService.userLeftRoom().subscribe(data=>this.messageArray.push(data));
    this._chatService.newMessageReceived().subscribe(data=>this.messageArray.push(data));
    

  }

  ngOnInit() {
  }

  
  join(){
      let reqObj = { user:this.user, room:this.room };
      this._chatService.joinRoom(reqObj);
      console.log("this.messageArray", this.messageArray) 
  }

  leave(){
      this._chatService.leaveRoom({user:this.user, room:this.room});
  }

  sendMessage(){
    this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
  }

}
