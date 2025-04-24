import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ecomm-home-list',
  templateUrl: './ecomm-home-list.component.html',
  styleUrls: ['./ecomm-home-list.component.scss']
})
export class EcommHomeListComponent implements OnInit {
  
  
  ngOnInit(): void {
   this.videoEncode=''
  }

  HomeContect:any

  videoEncode:any



//   @ViewChild('videoPlayer') videoplayer: any;

// toggleVideo(event: any) {
//     this.videoplayer.play();
// }

//   getFiles(event:any){


  // const FileSource: File = event.target.files[0]
  // const reader = new FileReader();
  // reader.onloadend = () => {
  //   this.videoEncode = reader.result
  //   console.log(this.videoEncode);
  // }
  // reader.readAsDataURL(FileSource);
  // }  

//   AddHomeContent(){

//   }

videoSrc: string | ArrayBuffer | null = null; 


getFiles(event: any): void {
  const file = event.target.files[0]; 
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.videoSrc = e.target.result; 
      console.log(this.videoSrc);
      
    };
    reader.readAsDataURL(file); 
  }
}

}
