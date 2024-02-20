import { Component, Signal, ViewContainerRef, WritableSignal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  
  private dataService  = inject(DataService);
  public categorySignal : any= toSignal(this.dataService.loadCategories()) || [];
  private productsSignal : any= toSignal(this.dataService.loadProducts()) || [];
  category : FormControl = new FormControl("");
  searchProduct : FormControl = new FormControl("");
  public filterSignal : WritableSignal<any> = signal({category : this.category.value,searchProduct : this.searchProduct.value} as any);
  private categoryFilterSignal = toSignal(this.category.valueChanges,{initialValue:""});
  private productFilterSignal = toSignal(this.searchProduct.valueChanges,{initialValue:""})
  public filteredUsers : Signal<any> = computed(() => {
    console.log(this.productFilterSignal())
    return !this.categoryFilterSignal() && !this.productFilterSignal()
      ? this.productsSignal()?.products
      : this.productsSignal()?.products.filter((product : any) => {
        if(this.categoryFilterSignal() && this.productFilterSignal().toLowerCase()){
          return (
            product.name.toLowerCase().includes(this.productFilterSignal().toLowerCase()) 
            && product.category === this.categoryFilterSignal()
          );
        }else if(!this.categoryFilterSignal()){
          return (
            product.name.toLowerCase().includes(this.productFilterSignal().toLowerCase()) 
            //&& product.category === this.categoryFilterSignal()
          );
        }else{
          return(product.category === this.categoryFilterSignal())
        }
        
      });

      
  });
}
