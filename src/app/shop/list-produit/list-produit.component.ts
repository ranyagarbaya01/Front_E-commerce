import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.scss']
})
export class ListProduitComponent implements OnInit {
  products: Product[] = [];
  search=""
  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
this.getProducts()  }

  getProducts() {
    this.shopService.getallproduct(this.search).subscribe({
      next: response => {
        this.products = response;
      },
      error: error => console.log(error)
    })
  }
  deleteProduct(id : number){
this.shopService.deleteproduct(id).subscribe({
  next :() => { this.ngOnInit() } ,

  error: error => console.log(error)


})
  }

}
