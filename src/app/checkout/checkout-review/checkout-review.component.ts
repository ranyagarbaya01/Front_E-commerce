import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit{

  ngOnInit(): void {
    console.log(this.checkoutForm?.value);
  }
  @Input() appStepper?: CdkStepper;
  @Input() checkoutForm?: FormGroup;

  constructor(private basketService: BasketService, private toastr: ToastrService) {}
callform(){
  console.log(this.checkoutForm?.value);

}
  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper?.next();
      },
      error: error => this.toastr.error(error.message)
    })
  }
  mapcheckouttoOrder() : any{


}}
