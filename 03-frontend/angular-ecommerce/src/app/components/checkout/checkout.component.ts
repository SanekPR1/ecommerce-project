import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  states: State[] = [];

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        country: [''],
        state: [''],
        city: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        country: [''],
        state: [''],
        city: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.shopFormService.getCreditCardMonths(new Date().getMonth() + 1)
      .subscribe(
        data => {
          console.log("We received months " + JSON.stringify(data));
          this.creditCardMonths = data;
        }
      )

    this.shopFormService.getCreditCardYears()
      .subscribe(
        data => {
          this.creditCardYears = data;
        }
      )

    this.shopFormService.getCountries()
      .subscribe(
        data => {
          console.log(`Retrieved countries: ${JSON.stringify(data)}`);
          this.countries = data;
        }
      )
  }

  onSubmit() {
    console.log("Handling the submit form");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log(`The email address is: ${this.checkoutFormGroup.get('customer')!.value.email}`);
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth)
      .subscribe(
        data => {
          this.creditCardMonths = data;
        }
      )
  }

}
