import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand, Type } from 'src/app/shared/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  isEdit: boolean = false;
  brands: Brand[] = [];
  types: Type[] = [];
idn : any 
  constructor(
    private fb: FormBuilder,
    private productService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      familleId: [null],
      famille: [null],

      typeId: [null],
      type: [null],

      productimage: [null]
    });
  }
  


  ngOnInit(): void {

    this.getBrands()
    this.getTypes()
    this.route.params.subscribe(params => {
       this.idn = params['id'];
      if (this.idn) {
        this.isEdit = true;
        this.productService.getProduct(this.idn).subscribe({
          next: (product) => {
            this.productForm.patchValue(product);
          },
          error: (err) => console.error('Error fetching product:', err)
        });
      }        
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.getBase64Image(file).then(base64Image => {
        this.productForm.patchValue({ productimage: base64Image });
      }).catch(err => {
        console.error('Error reading file:', err);
      });
    }
  }

  getBase64Image(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject('Failed to read file');
      reader.readAsDataURL(file);
    });
  }
  getBrands() {
    this.productService.getBrands().subscribe({
      next: response => this.brands = [{id: 0, name: "Tous"}, ...response],
      error: error => console.log(error)
    })
  }

  getTypes() {
    this.productService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name: "Tous"}, ...response],
      error: error => console.log(error)
    })
  }

  saveProduct() {
    if (this.productForm.valid) {
      if (this.isEdit) {
        this.productService.updateProduct(this.idn, this.productForm.value).subscribe({
          next: () => this.router.navigate(['/shop']),
          error: (err) => console.error('Error updating product:', err)
        });
      } else {
        this.productService.addProduct(this.productForm.value).subscribe({
        next: () => this.router.navigate(['/shop']),
          error: (err) => console.error('Error adding product:', err)
        });
      }
    }
  }
}
