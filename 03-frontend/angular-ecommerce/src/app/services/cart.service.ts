import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  // Subject - observable subclass. we can use it to publish events in our code
  // the event will bw sent to all subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    //chek if we already have the item in our cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on item id
      existingCartItem = this.cartItems.find(item => item.id === cartItem.id);

      //check if we found it
      alreadyExistInCart = existingCartItem != undefined;
    }

    if (alreadyExistInCart) {
      existingCartItem!.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }

  decrementQuantity(item: CartItem) {
    item.quantity--;
    if (item.quantity === 0) {
      this.remove(item);
    }
    else {
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    console.log('Contents of the cart');

    for (let item of this.cartItems) {
      totalPriceValue += item.unitPrice * item.quantity;
      totalQuantityValue += item.quantity;
      console.log(`name: ${item.name}, quantity = ${item.quantity}, unitPrice = ${item.unitPrice}, subtotal = ${totalPriceValue}`);

    }

    //publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    console.log(`TotalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity = ${totalQuantityValue}`);
    console.log('----------');

  }

  remove(item: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      currentItem => currentItem.id === item.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1)
      this.computeCartTotals();
    }
  }
}
