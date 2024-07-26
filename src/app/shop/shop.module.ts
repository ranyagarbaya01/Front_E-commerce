import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { AddProductComponent } from './add-product/add-product.component';

import { FormsModule } from '@angular/forms';
import { ListProduitComponent } from './list-produit/list-produit.component';


@NgModule({
  declarations: [ 
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    AddProductComponent,
    ListProduitComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,FormsModule
  ]
})
export class ShopModule { }
