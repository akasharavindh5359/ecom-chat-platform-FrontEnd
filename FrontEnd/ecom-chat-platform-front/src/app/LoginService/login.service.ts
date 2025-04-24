import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  

  constructor(private http: HttpClient) { }

  sigin(value: any) {
    return this.http.post('http://localhost:9091/api/auth/signup', value)
  }

  login(value : any){
    return this.http.post('http://localhost:9091/api/auth/signin', value)
  }
  // login(username: string, password: string){
  //   

  // }


}
