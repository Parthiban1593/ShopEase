import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Signal, computed, inject, signal } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { DataService } from './services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private dataService  = inject(DataService);
  public categorySignal = signal(this.dataService.loadCategories());
  private productsSignal : any= toSignal(this.dataService.loadProducts());
  public filterSignal = signal({} as any);
  private products = [];
  public filteredUsers : Signal<any> = computed(() => {
    const filterObj = this.filterSignal();

    return !this.filterSignal().productName
      ? this.productsSignal()?.products
      : this.productsSignal()?.products.filter((product : any) => product?.name === this.filterSignal().productName);
  });
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    

}
