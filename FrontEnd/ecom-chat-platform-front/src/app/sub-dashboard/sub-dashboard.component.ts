import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AddProductService } from '../EcommericeService/add-product.service';

@Component({
  selector: 'app-sub-dashboard',
  templateUrl: './sub-dashboard.component.html',
  styleUrls: ['./sub-dashboard.component.scss']
})
export class SubDashboardComponent {

  // videos = [
  //   { src: 'assets/Images/samsungs24.webm', title: 'Welcome to Our Shop!', description: 'Best deals just for you' } ,
  //   { src: 'assets/Images/98026-646632863.mp4', title: 'Shop the Latest Trends', description: 'New arrivals daily' },
  //   { src: 'assets/Images/samsungs24.webm', title: 'Limited Time Offers', description: 'Hurry up! Shop now' }
  // ];
  // videoUrls: string[] = [
  //   'assets/Images/samsungs24.webm', // Example video paths
  //   'assets/video2.mp4',
  //   'assets/video3.mp4'
  // ];

  intervalId: any;

  currentVideoIndex: number = 0;
  // currentVideoIndex: number = 0;
  videoChangeInterval: any;  



  ngOnInit(): void {
  }

  // images: string[] = [
  //   'img':'assets/Images/ecommercebg_pg.jpg',
    
  //   'assets/Images/ecommercebg_pg.jpg',
  //   'assets/Images/ecommercebg_pg.jpg'
  // ];



  

}
