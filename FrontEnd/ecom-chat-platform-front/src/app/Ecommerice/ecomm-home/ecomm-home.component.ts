import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AddProductService } from '../../EcommericeService/add-product.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ecomm-home',
  templateUrl: './ecomm-home.component.html',
  styleUrls: ['./ecomm-home.component.scss']
})
export class EcommHomeComponent {

  // ngOnInit(){
  //   this.GetProductData()
  // }
  ProductAllData:any=[]
  // path:any = 'src/assets/Images/98026-646632863.mp4'

  videoSrc: string | ArrayBuffer | null = null; 
  // slides :any
  slides : any[] =new Array()

  mobileManuList :any [] = new Array()
  CatogoryNameList : any [] = new Array()
  ElecSubCatNameList: any [] = new Array()
  SubCategoryNameList: any [] = new Array()
  SubCatList : any [] = new Array()
 

  constructor(private productService: AddProductService, private router: Router){
    
  }
  ngOnInit(): void {
    this.GetProductData()
    this. videoSrc=''
    this.slides.push({
      // src:'assets/Images/levitating-music-headphones-display.jpg'
    })
    this.getHeaderMeanuList()
  }

  GetProductData(){
    
    this.productService.getAllData().subscribe({
      next:(data:any) =>{
        console.log(data)
        this.ProductAllData=data
      }
    })
  }


  @ViewChild('bgVideo', { static: false }) bgVideo!: ElementRef;

  ngAfterViewInit() {
    const video: HTMLVideoElement = this.bgVideo.nativeElement;

 
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => console.log('Video is playing successfully'))
        .catch(() => {
          console.log('Autoplay blocked! Waiting for user interaction.');

        
          document.addEventListener('click', () => {
            video.play().catch(error => console.error('Error playing video:', error));
          }, { once: true }); 
        });
    }

   
    video.addEventListener('ended', () => {
      video.currentTime = 0; // Reset to start
      video.play();
    });

   
    window.addEventListener('load', () => {
      video.muted = true; // Ensure video remains muted
      video.play().catch(error => console.error('Error playing video after reload:', error));
    });
  }

  TriggerName:any = ''
  getdata(index:number){
    debugger
    this.ElecSubCatNameList =this.CatogoryNameList[index].subCatName
    // this.TriggerName = this.CatogoryNameList[index].catName
     console.log(this.ElecSubCatNameList)
  }

  scrolldiv(){
  
  const myDiv = document.getElementById('Headcontent') as HTMLDivElement;

  let x = myDiv?.offsetTop
  
  console.log(x);
  
  // if( == '500'){

  // }
  
  }


    // this.scrollDown();
    // ngAfterViewInit(): void {
    //   this.scrollDown();
    // }
  

    title = 'scroll-to-element-example';

    // Reference to the div you want to scroll into view
    @ViewChild('scrollDiv') scrollDiv!: ElementRef;
  
    // Listen to the window scroll event
    @HostListener('window:scroll', ['$event'])
    onScroll(event: any): void {
      // Check if the page has been scrolled more than 200px
      if (window.scrollY > 200) {
        // Scroll the target div to the top of the screen
        this.scrollToElement();
      }
    }

    scrollToElement(): void {
      if (this.scrollDiv) {
        // Scroll the element into view smoothly
        this.scrollDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    getHeaderMeanuList(){
      debugger
      this.productService.getCategoryList().subscribe({
        next:(value:any)=>{
          
          this.CatogoryNameList = value.catName
          for(var m =0; m < this.CatogoryNameList.length;m++ ){
            debugger
            this.mobileManuList.push({
              name:this.CatogoryNameList[m].catName,
              subCatName:this.CatogoryNameList[m].subCatName
            })
           
         
          }
          console.log(this.mobileManuList);
          
        }
      })
    }
 

callProduct(){
   this.router.navigate(['product'])
}

 
 

}
