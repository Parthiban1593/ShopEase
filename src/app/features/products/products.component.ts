import { Component, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private dataService  = inject(DataService);
  public categorySignal = toSignal(this.dataService.loadCategories());
  private productsSignal : any= toSignal(this.dataService.loadProducts());
  public filterSignal = signal({} as any);
  private products = [];
  public filteredUsers : Signal<any> = computed(() => {
    const filterObj = this.filterSignal();

    return !this.filterSignal().productName
      ? this.productsSignal()?.products
      : this.productsSignal()?.products.filter((product : any) => product?.name === this.filterSignal().productName);
  });
}
