import { Component } from '@angular/core';
import { Brand } from '../../shared/models/product';
import { ShopService } from '../../shop/shop.service';

@Component({
  selector: 'app-list-famille',
  templateUrl: './list-famille.component.html',
  styleUrls: ['./list-famille.component.scss']
})
export class ListFamilleComponent {

  familles: Brand[] = [];
  search: string = '';

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getFamilles(); 
  }

  getFamilles(): void {
    this.shopService.getBrands(this.search).subscribe({
      next: (response) => {
        this.familles = response;
      },
      error: (error) => console.error(error)
    });
  }

  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getFamilles();
  }

  deleteFamille(id: number) {
    this.shopService.deleteBrand(id).subscribe({
      next: () => {
        this.getFamilles(); 
      },
      error: (error) => console.log(error)
    });
  }

}
