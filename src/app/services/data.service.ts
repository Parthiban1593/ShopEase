import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class DataService {
  
    constructor(private httpClient : HttpClient) { 

    }

    public loadProducts(){
        return this.httpClient.get('./data/products.json')
    }

    public loadCategories(){
        return this.httpClient.get(`./data/categories.json`)
    }
}