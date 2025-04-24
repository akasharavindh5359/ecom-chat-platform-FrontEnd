import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  Product : any[] = new Array()


  constructor(private router : Router){

  }


  ngOnInit(){

    this.getproductList()
  }


  getproductList(){
    this.Product.push({
      id: 1,
      name: 'Product 1',
      description: 'This is a detailed description of Product 1.',
      price: 199.99,
      imageUrl: 'assets/Images/iphone_16_pro__erqf8e51gl4y_xlarge.jpg',
      additionalImages: [
        'assets/Images/iphone_additional_1.jpg',
        'assets/Images/iphone_additional_2.jpg',
        'assets/Images/iphone_additional_3.jpg'
      ],
      rating: 4.5,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      reviews: [
        { reviewer: 'John Doe', comment: 'Great product!', rating: 5 },
        { reviewer: 'Jane Smith', comment: 'Good value for money.', rating: 4 }
      ]
    });
    this.Product.push({
      id: 2,
      name: 'Product 2',
      description: 'This is a detailed description of Product 2.',
      price: 299.99,
      imageUrl: 'assets/Images/product_2_image.jpg', 
      additionalImages: [
        'assets/Images/product_2_additional_1.jpg',
        'assets/Images/product_2_additional_2.jpg'
      ],
      rating: 4.2,
      features: ['Feature A', 'Feature B', 'Feature C'],
      reviews: [
        { reviewer: 'Alice Brown', comment: 'Awesome!', rating: 5 },
        { reviewer: 'Mark Evans', comment: 'Worth the price.', rating: 4 }
      ]
    });
  }


  CallBack(){
    this.router.navigate(['/'])
  }


}
