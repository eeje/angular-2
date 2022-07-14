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
  typeArray = [];
  // addToTest(addedItem){
  //   this.layout.push({
  //     x: addedItem.x,
  //       y: 0,
  //       w: 2,
  //       h: addedItem.y,
  //       id: addedItem.id.toString(),
  //   });
  //   console.log('*', addedItem);

  //   // //-----check if there are items already added in cart
  //   // let existingItems = [];
  //   // if (localStorage.getItem('layout')) {
  //   //   //----- update by adding new items
  //   //   existingItems = JSON.parse(localStorage.getItem('layout'));
  //   //   existingItems = [addedItem, ...existingItems];
  //   //   console.log('Items exists');
  //   // }
  //   //     //-----if no items, add new items
  //   // else {
  //   //   console.log('NO items exists');
  //   //   existingItems = [addedItem];
  //   // }
  //   this.saveCart();
  // }
  getItems() {
    return this.layout;
  }
  gettypeArray() {
    return this.typeArray;
  }
  typeArrayUpdated(tyArray) {
    this.typeArray = tyArray;
    localStorage.setItem('typeArray', JSON.stringify(this.typeArray));
  }
  loadCart(): void {
    this.layout = JSON.parse(localStorage.getItem('layout')) ?? [];
    this.typeArray= JSON.parse(localStorage.getItem('typeArray')) ?? [];
  }
  saveCart(): void {
    localStorage.setItem('layout', JSON.stringify(this.layout));
  }
  layoutUpdated(layout: KtdGridLayout){
    this.layout = layout;
    this.saveCart()
  }
  clearCart(items) {
    this.layout = [];
    this.typeArray = [];
    localStorage.removeItem('layout');
    localStorage.removeItem('typeArray');
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