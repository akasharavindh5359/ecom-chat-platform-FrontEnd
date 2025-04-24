import { Component } from '@angular/core';
import { ChatServiceService } from '../../CommonService/chat-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  inputData: string = ''; 
  chatResponce : any 
 

  chatbotList : any[] = new Array()
  

  
  visible:boolean = false
  loadingvisible:boolean = false
  
  ngOnInit(){
  }

  constructor(private chatService : ChatServiceService , private toastr: ToastrService){}


  CallChatBot(){
    if(this.visible){
        this.visible=false
    }
    else{
      this.visible=true
      this.chatbotList.push(
        {
          requesttype:'responce',
          requestvalue:'Hello! How can I assist you today?'
        })
    }
  }

  GetResponce(){
    this.loadingvisible=true
    console.log(this.inputData)
    const data = this.inputData
    this.chatbotList.push(
    {
      requesttype:'request',
      requestvalue:this.inputData
    })
    this.inputData =''
    this.chatService.getChatbotData(data).subscribe({
      next:(data:any)=>{
        
        console.log(data)
        this.getresponce(data)

      },
      error: (error) => {
        this.toastr.error(error.message, 'Error!');
       
      },
    })
  

  }

  getresponce(data:any){
    

    let test =data.botResponse
    let result = test.substring(19);
    this.loadingvisible=false
    
    // var subData = res.substring(0,10)
    this.chatbotList.push(
      {
        requesttype:'responce',
        requestvalue:result
      })
  }
}
