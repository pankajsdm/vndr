import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import io from 'socket.io-client';


@Injectable()
export class ChatService {

  public socket = io.connect(environment.backendUrl);    

  private dataSource = new BehaviorSubject<any>(null);
  getObserver = this.dataSource.asObservable();


  setObserver(data: any) {
    this.dataSource.next(data)
  }

  joinRoom(data){
    this.socket.emit('join', data);
    
  }


  newUserJoined(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
        this.socket.on('new_user_joined', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
  }

  userLeftRoom(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
        this.socket.on('left room', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });
    return observable;
  }

  sendMessage(data){
    this.socket.emit('message', data);
  }

  newMessageReceived(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
        this.socket.on('new_message', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });
    return observable;
  }

}
