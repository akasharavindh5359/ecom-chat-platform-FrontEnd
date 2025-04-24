import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddProductService } from '../../EcommericeService/add-product.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adding-product',
  templateUrl: './adding-product.component.html',
  styleUrls: ['./adding-product.component.scss']
})

export class AddingProductComponent {

  private lastDeltaY = 0;
  private scrollTimeout: any;

  filterBrandList: any[] = new Array()
  imageFile: any;
  FileSource: any
  step: number = 0
  imgList: any[] = new Array()
  tableData : any[] = new Array()
  Category : any[] = new Array()
  SubCategory : any[] = new Array()

  // ProductName:any = 'iuiugh'


  ProductData = new FormGroup({
    ProductName: new FormControl<string>(''),
    ProductCategory: new FormControl<string>(''),
    ProductBrand: new FormControl<string>(''),
    MemorySize:new FormControl<number | null>(null),
    ProductPrice: new FormControl<string>(''),
    ScreenSize: new FormControl<number | null>(null),
    BatterySize:new FormControl<number | null>(null),
    Os:new FormControl<number | null>(null),
    ProductQuantity: new FormControl<number | null>(null),
    Popularity: new FormControl<string>(''),
    releaseDate: new FormControl<string>(''),
    productStatus: new FormControl<boolean>(true)
  })

  constructor(private productService: AddProductService, private toastr: ToastrService,private router: Router) { }


  ngOnInit(){
    this.getAllCategory()
  }

  // Category = [
  //   { value: 'M', viewValue: 'MOBILE' },
  //   { value: 'L', viewValue: 'LAPTOP' },
  //   { value: 'TV', viewValue: 'TV' },
  // ];

  // BrandList = [
  //   { value: 'Samsung', viewValue: 'SAMSUNG', id: 'M' },
  //   { value: 'APPLE', viewValue: 'APPLE', id: 'M' },
  //   { value: 'Xiaomi', viewValue: 'XIAOMI', id: 'M' },
  //   { value: 'OPPO', viewValue: 'OPPO', id: 'M' },
  //   { value: 'VIVO', viewValue: 'VIVO', id: 'M' },
  //   { value: 'MOTOROLA', viewValue: 'MOTOROLA', id: 'M' },
  //   { value: 'Lenovo', viewValue: 'LENOVO', id: 'M' },


  //   { value: 'Asus', viewValue: 'Asus', id: 'L' },
  //   { value: 'HP', viewValue: 'HP', id: 'L' },
  //   { value: 'Apple', viewValue: 'Apple', id: 'L' },
  //   { value: 'Dell', viewValue: 'Dell', id: 'L' },
  //   { value: 'Acer', viewValue: 'Acer', id: 'L' },
  //   { value: 'Samsung', viewValue: 'Samsung', id: 'L' },
  //   { value: 'Lenovo', viewValue: 'Lenovo', id: 'L' },


  //   { value: 'Sony', viewValue: 'Sony', id: 'TV' },
  //   { value: 'Lg', viewValue: 'Lg', id: 'TV' },
  //   { value: 'Panasonic', viewValue: 'Panasonic', id: 'TV' },
  //   { value: 'TCL', viewValue: 'TCL', id: 'TV' },
  //   { value: 'Xiaomi', viewValue: 'Xiaomi', id: 'TV' },
  //   { value: 'Hisense', viewValue: 'Hisense', id: 'TV' },
  // ];

  getData(event: any) {
    debugger
    const value = event.value
    let findvalue = this.SubCategory.filter((item) => item.SubCatId == value);
    // let filteredPeople = this.BrandList.filter((item) => item.id.toUpperCase() == findvalue?.value);
    this.filterBrandList = findvalue
  }

  uploadImage() {
    const file = document.getElementById('image-upload') as HTMLInputElement
    file.click()
  }

  getFiles(event: any) {
    
    const file = document.getElementById('image-des') as HTMLDivElement
    file.style.display = 'none';
    const img = document.getElementById('img') as HTMLDivElement
    img.style.display = 'block';
    const slide = document.getElementById('carouselExampleIndicators') as HTMLDivElement
    slide.style.display = 'block';
    const changebtn = document.getElementById('changeBtn') as HTMLButtonElement
    changebtn.style.display = 'block';
    this.imageFile = []
    for (let i = 0; i < event.target.files.length; i++) {
      let base64
      const FileSource: File = event.target.files[i]
      const reader = new FileReader();
      reader.onloadend = () => {
        base64 = reader.result
        this.imageFile.push(
          {
            FileSource: base64,
            imgname: event.target.files[i].name
          }
        )
        this.FileSource = this.imageFile[0].FileSource
        this.step = 0
      };
      reader.readAsDataURL(FileSource);
    }
  }

  nextImage() {
    this.step++
    if (this.step >= this.imageFile.length) { this.step = 0; } this.FileSource = this.imageFile[this.step].FileSource
  }

  prevImage() {
    
    this.step--
    if (this.step == -1) {
      this.step = this.imageFile.length
    }
    this.FileSource = this.imageFile[this.step].FileSource
  }


  saveProductData() {
    
    let currentPrice = this.ProductData.controls['ProductPrice'].value;
    let high = this.ProductData.controls['ProductPrice'].value;
    let highPrice = Number(high);
    // let highesPrice =highPrice*1.5

    // let lowprice = this.ProductData.controls['ProductPrice'].value;
    // let low = Number(lowprice);
    // let lowestPrice =low - (low * .35);


    // let memory =this.ProductData.controls['ProductDescription'].value
    // let mem = String(memory);
    // let start = mem.indexOf("|") + 2; 
    // let end = mem.indexOf("GB", start); 
    // let memorySize = mem.substring(start, end).trim();
    debugger

    var categoryId =this.ProductData.controls['ProductBrand'].value
    const categoryData =this.Category.find((item)=>item.CatId === categoryId)
    var subcategoryId = this.ProductData.controls['ProductCategory'].value
    const subCategaoryData = this.SubCategory.find((item)=>item.SubCatId === subcategoryId)
  
    
    const value = {
      modelName: this.ProductData.controls['ProductName'].value,
      category: categoryData.CatName,
      brandName: subCategaoryData.SubCatName,
      bestPrice: this.ProductData.controls['ProductPrice'].value,
      memorySize:this.ProductData.controls['MemorySize'].value,
      os:this.ProductData.controls['Os'].value,
      prodQuantity: this.ProductData.controls['ProductQuantity'].value,
      popularity: this.ProductData.controls['Popularity'].value,
      prodStatus: this.ProductData.controls['productStatus'].value,
      batterySize: this.ProductData.controls['BatterySize'].value,
      screenSize: this.ProductData.controls['ScreenSize'].value,
      sellersAmount:this.ProductData.controls['ProductQuantity'].value,
      releaseDate:this.ProductData.controls['releaseDate'].value,
      imageSource:this.imageFile[0].FileSource
      
    }
    console.log(value)
    this.productService.addProductHead(value).subscribe({
      next: (data: any) => {
        
        // this.toastr.success('Data Saved Successfully', 'Product');
        // this.ProductData.reset()
        this.imgeUpdate(data.masTranId)

        



      },
      error: (error) => {
        console.error('An error occurred:', error.message);
        this.toastr.error(error.message, 'Error!');
      },
      complete: () => {

      }
    });

    




  }

  imgeUpdate(id: number) {
    
    let imgarray:any = []
    for (let i = 0; i < this.imageFile.length; i++) {
       imgarray.push(
        {
          imageName:this.imageFile[i].imgname,
          imageSource:this.imageFile[i].FileSource
        }
       )
    }
    const Imgjson = {
      masTranId: id,
      imgList: imgarray
    }

    this.productService.addImagedata(Imgjson).subscribe({
      next: (data: any) => {
        
        console.log(data.value);
        this.toastr.success('Data Saved Successfully', 'Product');
        this.ProductData.reset()
        this.imageFile = []
        this.FileSource = ''
        const file = document.getElementById('image-des') as HTMLDivElement
        file.style.display = 'block';
        const img = document.getElementById('img') as HTMLDivElement
        img.style.display = 'none';
        const slide = document.getElementById('carouselExampleIndicators') as HTMLDivElement
        slide.style.display = 'none';
        const changebtn = document.getElementById('changeBtn') as HTMLButtonElement
        changebtn.style.display = 'none ';
      },
      error: (error) => {
        console.error('An error occurred:', error.message);
        this.toastr.error(error.message, 'Error!');
      },
      complete: () => {

      }
    });

  }

  getAllCategory(){
    
    this.productService.getCategoryList().subscribe({
      next:(val : any)=>{
        console.log(val)
        if(val.status == 'success'){
          
          for(let a =0;a<val.catName.length;a++){
            this.Category.push({
              'CatId':val.catName[a].catId,
              'CatName':val.catName[a].catName
            })
            for(let k = 0 ; k<val.catName[a].subCatName.length;k++){
              this.SubCategory.push({
                'SubCatId':val.catName[a].catId,
                'SubCatName':val.catName[a].subCatName[k].name
              })
            }
            
            
          }
          console.log(this.SubCategory);
          console.log(this.Category);
          
          
          this.tableData=[]
        // for(var i = 0 ; i<val.catList.length;i++){
        //   this.tableData.push({
        //     id:val.catList[i].catTranId,
        //     image:val.catList[i].categoryImg,
        //     imageName:val.catList[i].categoryName
        //   })
        //   console.log(this.tableData);
          
        // }
        }
        
      },
      error: (error) => {
        this.toastr.error(error.message, 'Error!');
       
      },
    })
  }


  //  @HostListener('window:wheel', ['$event'])
  //   onScroll(event: WheelEvent) {
  //     if (event.ctrlKey || event.deltaMode === 0) { // Detects touchpad scroll
  //       if (Math.abs(event.deltaY - this.lastDeltaY) > 30) { // Adjust sensitivity
  //         clearTimeout(this.scrollTimeout);
  //         this.scrollTimeout = setTimeout(() => {
  //           this.router.navigate(['/addCat']); // Navigate to new route
  //         }, 500);
  //       }
  //       this.lastDeltaY = event.deltaY;
  //     }
  //   }


}
