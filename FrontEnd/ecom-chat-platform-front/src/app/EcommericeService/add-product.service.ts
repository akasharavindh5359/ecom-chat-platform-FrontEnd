import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  

  private baseUrl = 'http://localhost:9090/ecom/';
  constructor(private http: HttpClient) { }

  addProductHead(data:any){
    // return this.http.get<Comment[]>(`${this.baseUrl}product`);
    return this.http.post(this.baseUrl+'addProductData',data)
  }

  addImagedata(imageData:any){
    return this.http.post(this.baseUrl+'addImageData',imageData)
  }

  AddCategory(value: any) {
    
    return this.http.post(this.baseUrl+'addCatogory',value)
  }

  getAllData(){
    return this.http.get(this.baseUrl+'GetProductData')
  }

  getAllCategory(){
    return this.http.get(this.baseUrl+'getCatogory')
  }

  updateCatogory(id:any){
    
    return this.http.get(this.baseUrl+'getCatogoryID?Id='+id)
  }

  updateCatAndSub(value:any){
    return this.http.put(this.baseUrl+'updateCatogory',value)
  }

  getCategoryList(){
    return this.http.get(this.baseUrl+'getCatSubcatList')
  }
  


}
