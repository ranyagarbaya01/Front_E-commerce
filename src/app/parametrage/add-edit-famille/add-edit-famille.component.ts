import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-famille',
  templateUrl: './add-edit-famille.component.html',
  styleUrls: ['./add-edit-famille.component.scss']
})
export class AddEditFamilleComponent {

  familleForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private familleService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.familleForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); 
      if (this.id) {
        this.isEdit = true;
        this.loadFamilleData();
      }
    });
  }

  loadFamilleData(): void {
    if (this.id) {
      this.familleService.getFamilleById(this.id).subscribe(famille => {
        this.familleForm.patchValue({
          name: famille.name,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.familleForm.valid) {
      const familleData = this.familleForm.value;
      if (this.isEdit && this.id) {
        this.familleService.updateBrand(this.id, familleData).subscribe(
          () => this.router.navigate(['/AllFamille']),
          error => console.error('Error updating brand', error)
        );
      } else {
        this.familleService.addBrand(familleData).subscribe(
          () => this.router.navigate(['/AllFamille']),
          error => console.error('Error adding brand', error)
        );
      }
    }
  }
}
