// import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddProductService } from '../../EcommericeService/add-product.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {A, COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {NgFor} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-add-catogory',
  templateUrl: './add-catogory.component.html',
  styleUrls: ['./add-catogory.component.scss']
})
export class AddCatogoryComponent {

  CateImage:any
  catName:String =''
  catimg:any
  IDcatName:String =''
  Pre_catName:String =''
  catEncode:any = ''
  tableData: any[] = new Array()
  subCatogory: any[] = new Array()
  AddCate: boolean=true
  Tranid:number =0
  precatEncode:any

  getCatogoryid: any[] = new Array()
 
 


  ngOnInit() {
    this.getAllCategory();
    // window.location.reload()
  }
   
   constructor(private service :AddProductService,private toastr: ToastrService){

   }


   


 

  AddCategory(){
    
    let CategoryName = this.catName
    let Catimg = this.catEncode
    this.precatEncode=this.catEncode
    const catList={
      categoryName:CategoryName,
      categoryImg:Catimg
    }
    this.service.AddCategory(catList).subscribe({
     next:(value:any) =>{
      console.log(value.status)
      if(value.status == 'success'){
        this.toastr.success('Data Saved Successfully', 'Product');
      this.catName='';
      const values = document.getElementById('categoryImage') as HTMLInputElement
      values.value = ''
      this.catEncode='';
      this.getAllCategory()
    }else{
     
        this.toastr.error(value.responseMes,'Error!');
       
      
    }
     },
    })
}

getFiles(event:any){


  const FileSource: File = event.target.files[0]
  const reader = new FileReader();
  reader.onloadend = () => {
    this.catEncode = reader.result
    console.log(this.catEncode);
  }
  reader.readAsDataURL(FileSource);
   
  }


  getAllCategory(){
    // 
    this.service.getAllCategory().subscribe({
      next:(val : any)=>{
        console.log(val)
        if(val.status == 'success'){
          
          this.tableData=[]
        for(var i = 0 ; i<val.catList.length;i++){
          this.tableData.push({
            id:val.catList[i].catTranId,
            image:val.catList[i].categoryImg,
            imageName:val.catList[i].categoryName
          })
        }
        }
        
      },
      error: (error) => {
        this.toastr.error(error.message, 'Error!');
       
      },
    })
  }

  updateIndex:number = -1
  UpdateCall(index:any){
    
    this.updateIndex = index
    this.service.updateCatogory(this.tableData[index].id).subscribe({
      next:(val:any)=>{
        
        console.log(val);
        this.precatEncode=val.catList.categoryImg
        this.Pre_catName=val.catList.categoryName
        this.IDcatName=val.categoryName
        const CatName = document.getElementById('categoryName1') as HTMLInputElement
        CatName.value = val.catList.categoryName
        this.catimg = val.catList.categoryImg
        this.subCatName=(val.catList.subCatogory)
      }
    })
  }



  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  subCatName: Fruit[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    
    if (value) {
      this.subCatName.push({name: value});
    }

    
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.subCatName.indexOf(fruit);

    if (index >= 0) {
      this.subCatName.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    
    if (!value) {
      this.remove(fruit);
      return;
    }


    const index = this.subCatName.indexOf(fruit);
    if (index >= 0) {
      this.subCatName[index].name = value;
      

    }
  }

  UpdateCategory(){
    
    console.log(this.precatEncode)
    console.log(this.Pre_catName);
    
    let categoryImg: string = this.catEncode != "" ? this.catEncode : this.precatEncode;
    let preCatName  = this.catName != "" ? this.catName : this.Pre_catName;
    
    const updateRequest = ({
      catogoryId:this.tableData[this.updateIndex].id,
      catogoryName:preCatName,
      // catogoryImg:this.catEncode,
      catogoryImg: categoryImg,
      subCatogory:this.subCatName
      })
      
      console.log(updateRequest);
      this.service.updateCatAndSub(updateRequest).subscribe({
        next:(value:any)=>{
          if(value.status == 'success'){
            this.toastr.success(value.responseMes, 'Succes!')
            this.getAllCategory()
            const closeButton = document.getElementById('closeButton') as HTMLElement
            closeButton.click()
            this.catName=''
          }
        },
        error:(error:any)=>{
          this.toastr.error(error.message, 'Error!')
        }
      })

      
    }

    closeData(){
      this.subCatName=[]
      CatName:''

    }


  

  }


  

