import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AddProductComponent } from './shop/add-product/add-product.component';
import { ListProduitComponent } from './shop/list-produit/list-produit.component';
import { ShopComponent } from './shop/shop.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddEditTypeComponent } from './parametrage/add-edit-type/add-edit-type.component';
import { ListTypeComponent } from './parametrage/list-type/list-type.component';
import { ListFamilleComponent } from './parametrage/list-famille/list-famille.component';
import { AddEditFamilleComponent } from './parametrage/add-edit-famille/add-edit-famille.component';
import { AddEditUserComponent } from './parametrage/add-edit-user/add-edit-user.component';
import { ListUserComponent } from './parametrage/list-user/list-user.component';
import { ListClientComponent } from './parametrage/list-client/list-client.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent, 
    data: {breadcrumb: 'Home'}
  },
  {
    path: 'test-error', 
    component: TestErrorComponent
  },
  {
    path: 'not-found', 
    component: NotFoundComponent
  },
  {
    path: 'addproduct', 
    component: AddProductComponent
  },

  {
    path: 'AddType', 
    component: AddEditTypeComponent
  },
  {
    path: 'EditType/:id', 
    component: AddEditTypeComponent
  },
  {
    path: 'AllType', 
    component: ListTypeComponent
  },

  {
    path: 'AddFamille',
    component: AddEditFamilleComponent
  },
  {
    path: 'EditFamille/:id',
    component: AddEditFamilleComponent // Correct route with parameter
  },
  {
    path: 'AllFamille',
    component: ListFamilleComponent
  },


  {
    path: 'AddUser',
    component: AddEditUserComponent
  },
  {
    path: 'EditUser/:id',
    component: AddEditUserComponent 
  },
  {
    path: 'AllUser',
    component: ListUserComponent
  },
  {
    path: 'clients',
    component: ListClientComponent
  },



  {
    path: 'editproduct/:id', 
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },  {
    path: 'allproduct', 
    component: ListProduitComponent
  },
  {
    path: 'server-error', 
    component: ServerErrorComponent
  }, 
  {
    path: 'shop', 
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  

  {
    path: 'basket',  
    loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)
  },
  {
    path: 'checkout', 
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
  }, 
   

  // 2. lazy load the orders module in the app-routing.module.ts
  {
    path: 'orders', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'account', 
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
