import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop/shop.service';
import { Router } from '@angular/router';

interface Type {
  id: number;
  name: string;
}

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.scss']
})
export class ListTypeComponent implements OnInit {

  types: Type[] = [];
  search = '';

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
    this.getTypes(); 
  }

  getTypes() {
    this.shopService.getTypes(this.search).subscribe({
      next: (response) => {
        this.types = response;
      },
      error: (error) => console.log(error)
    });
  }

  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getTypes();
  }

  deleteType(id: number) {
    this.shopService.deleteType(id).subscribe({
      next: () => {
        this.ngOnInit(); 
      },
      error: (error) => console.log(error)
    });
  }
}
