import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../LoginService/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private loginservice: LoginService) { }

  loginData = new FormGroup({
    // name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  })
  submitdata() {
    
    this.loginData.value
    console.log("running")
    console.log(this.loginData.value)
    
    this.loginservice.sigin(this.loginData.value).subscribe((result:any)=>{
      console.log(result)
    })



  }



}
