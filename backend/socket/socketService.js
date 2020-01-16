

export default class SocketService {

    constructor(socket, io){
        this.socket = socket;
        this.io = io;
        this.joinRoom();
        this.leaveRoom();
        this.receiveMessage();
        this.sendMessage(this.io);
    }

    joinRoom(){
        this.socket.on('join', (data) =>{
            this.socket.join(data.room);
            setTimeout( () => {
                //this.socket.broadcast.to(data.room).emit('new_user_joined', {user:data.user, message:' has joined this room.'});
                this.io.in(this.socket.rooms[data.room]).emit('new_user_joined', {user:data.user, message:' has joined this room.'});
            }, 1000);
            console.log(data.user + ' pankaj joined the room: ' + data.room);
        }); 
    }

    leaveRoom(){
        this.socket.on('leave', (data) => {
            console.log(data.user + ' left the room : ' + data.room);
            this.socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
            this.socket.leave(data.room);
        });
    }

    receiveMessage(){
        this.socket.on('receive', (data)=>{
            console.log("received msg->", data);
        });
    }


    sendMessage(io){
        this.socket.on('message',(data) => {
            io.in(data.room).emit('new_message', {user:data.user, message:data.message});
        })
    }

   
}
