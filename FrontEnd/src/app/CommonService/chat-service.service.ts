import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private baseUrl = 'http://localhost:9090/bot/';
  constructor(private http : HttpClient) { }

  // getChatbotData(chatData:any){
  //   
  //   return this.http.post('http://localhost:9090/sendPrompt?chat=')
  // }

  getChatbotData(chatData:any){
  
    const params = new HttpParams().set('chat', chatData);
    return this.http.post(this.baseUrl+'sendPrompt?chat=' + chatData,'')
  }

}
