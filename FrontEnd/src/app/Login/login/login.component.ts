import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../LoginService/login.service';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  data: any;
  private lastDeltaY = 0;
  private scrollTimeout: any;
  

  constructor(private loginservice: LoginService, private router: Router) { }

  formValue = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  submitdata() {
    
    
    this.formValue.value
    console.log("running")
    console.log(this.formValue.value)
    
    this.loginservice.login(this.formValue.value).subscribe((result:any)=>{
      console.log(result)
      if(result !=null){
        Swal.fire({
          position: "center",
          icon: "success",
          // title: "  Login Successfull",
          title: '<span style="color: #4caf50; font-size: 1.5rem; font-weight: bold;"> Login Successful! </span>',
          showConfirmButton: false,
          timer: 1500
        });
        
        const logingmapping = {
          token:result.token,
          type:result.type,
          username:result.username,
          roles:result.roles
        };
        sessionStorage.setItem('token', result.token);
        this.router.navigateByUrl("home")
      }
    })
}

@HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.ctrlKey || event.deltaMode === 0) { // Detects touchpad scroll
      if (Math.abs(event.deltaY - this.lastDeltaY) > 30) { // Adjust sensitivity
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.router.navigate(['/sigin']); // Navigate to new route
        }, 500);
      }
      this.lastDeltaY = event.deltaY;
    }
  }
}
