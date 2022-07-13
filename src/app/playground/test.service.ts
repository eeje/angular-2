import { Injectable } from '@angular/core';
import {
  KtdGridComponent,
  KtdGridLayout,
  KtdGridLayoutItem,
  ktdTrackById,
} from '@katoid/angular-grid-layout';

@Injectable({
  providedIn: 'root',
})

export class TestService {
  constructor() {}
  layout: KtdGridLayout = [];

  addToTest(addedItem){
    this.layout.push(addedItem);
    console.log(addedItem);

    //-----check if there are items already added in cart
    let existingItems = [];
    if (localStorage.getItem('cart_items')) {
      //----- update by adding new items
      existingItems = JSON.parse(localStorage.getItem('cart_items'));
      existingItems = [addedItem, ...existingItems];
      console.log('Items exists');
    }
        //-----if no items, add new items
    else {
      console.log('NO items exists');
      existingItems = [addedItem];
    }
    this.saveCart();
  }
  getItems() {
    return this.layout;
  }
  loadCart(): void {
    this.layout = JSON.parse(localStorage.getItem('cart_items')) ?? [];
  }
  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.layout));
  }
  clearCart(items) {
    this.layout = [];

    localStorage.removeItem('cart_items');
  }
  removeItem(item) {
    const index = this.layout.findIndex((o) => o.id === item.id);

    if (index > -1) {
      this.layout.splice(index, 1);
      this.saveCart();
    }
  }
  itemInCart(item): boolean {
    return this.layout.findIndex((o) => o.id === item.id) > -1;
  }
}