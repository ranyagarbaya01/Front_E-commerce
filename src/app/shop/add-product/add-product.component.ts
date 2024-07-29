import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  idn: any;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      prixHT: [0 , [Validators.required, Validators.min(0)]],
      prixTTC: [0 , [Validators.required, Validators.min(0)]],
      TVA: [0 , [Validators.required, Validators.min(0)]],
      familleId: [null, Validators.required],
      typeId: [null, Validators.required],
      productimage: [null]
    });
  }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
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
      this.selectedFile = file;
    }
  }

  getBrands() {
    this.productService.getBrands().subscribe({
      next: response => this.brands = [...response],
      error: error => console.log(error)
    });
  }

  getTypes() {
    this.productService.getTypes().subscribe({
      next: response => this.types = [...response],
      error: error => console.log(error)
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();
      Object.keys(this.productForm.controls).forEach(key => {
        formData.append(key, this.productForm.get(key)?.value);
      });
      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile, this.selectedFile.name);
      }
  
      if (this.isEdit) {
        this.productService.updateProduct(this.idn, formData).subscribe({
          next: () => this.router.navigate(['/shop']),
          error: (err) => console.error('Error updating product:', err)
        });
      } else {
        this.productService.addProduct(formData).subscribe({
          next: () => this.router.navigate(['/shop']),
          error: (err) => console.error('Error adding product:', err)
        });
      }
    }
  }

  onPrixHTChange() {
    const prixHT : number = this.productForm.get('prixHT')?.value;
    const TVA : number = this.productForm.get('TVA')?.value;
    const totalTTC: number =( TVA)
    this.productForm.get('prixTTC')?.setValue((prixHT/10 + (prixHT * TVA) / 100));
  }

  onTVAChange() {
    const prixHT = this.productForm.get('prixHT')?.value;
    const TVA = this.productForm.get('TVA')?.value;
    this.productForm.get('prixTTC')?.setValue((prixHT/10 + (prixHT * TVA) / 100));
  }

  onPrixTTCChange() {
    const prixTTC = this.productForm.get('prixTTC')?.value;
    const TVA = this.productForm.get('TVA')?.value;
    this.productForm.get('prixHT')?.setValue(prixTTC / (1 + TVA / 100));
  }
}
