import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path:"home",
    component : HomeComponent
  },
  {
    path:"products",
    loadChildren :  () =>
    import('../app/features/products/products.module').then((m) => m.ProductsModule)
  },
  {
    path : "aboutUs",
    component : AboutUsComponent
  },
  {
    path:"contact",
    component : ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
