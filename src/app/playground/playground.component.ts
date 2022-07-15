import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import {
  KtdGridComponent,
  KtdGridLayout,
  KtdGridLayoutItem,
  ktdTrackById,
} from '@katoid/angular-grid-layout';
import { DOCUMENT } from '@angular/common';
import { TestService } from './test.service'
import { ktdArrayRemoveItem } from '../utils';

@Component({
  selector: 'ktd-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class KtdPlaygroundComponent implements OnInit, OnDestroy {
  @ViewChild(KtdGridComponent, { static: true }) grid: KtdGridComponent;
  trackById = ktdTrackById;
  cols = 12;
  rowHeight = 50;
  compactType: 'vertical' | 'horizontal' | null = 'vertical';
  layout: KtdGridLayout = [];
  sampleSuggestionsArray = [
      {id: 0, type: 'chart', x: 0, y: 0, w: 3, h: 3},
      {id: 1, type: 'table', x: 3, y: 0, w: 3, h: 4},
      {id: 2, type: 'text', x: 6, y: 0, w: 3, h: 5},
      {id: 3, type: 'note', x: 9, y: 0, w: 3, h: 6}
  ];
  typeArray = [];
  private resizeSubscription: Subscription;
  data: any;
  options: any;
  disableRemove = false;
  constructor(
    private ngZone: NgZone,
    public testService: TestService,
    public elementRef: ElementRef,
    @Inject(DOCUMENT) public document: Document
  ) {
    // this.ngZone.onUnstable.subscribe(() => console.log('UnStable'));
  }
  ngOnInit() {
  this.testService.loadCart();
   this.layout =this.testService.getItems();
   this.typeArray = this.testService.gettypeArray();
    this.resizeSubscription = merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange')
    )
      .pipe(debounceTime(50))
      .subscribe(() => {
        this.grid.resize();
      });
  }
  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
  generateLayout() {
    const layout: KtdGridLayout = [];
    for (let i = 0; i < this.cols; i++) {
      const y = Math.ceil(Math.random() * 4) + 1;
      layout.push({
        x: Math.round(Math.random() * Math.floor(this.cols / 2 - 1)) * 2,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        id: i.toString(),
        // static: Math.random() < 0.05
      });
    }
   // console.log('layout', layout);
     this.layout = layout;
  }

  onLayoutUpdated(layout: KtdGridLayout) {
    console.log('on layout updated', layout);
     this.layout = layout;
    this.testService.layoutUpdated(layout);
   //this.testService.saveCart();
   
  }
  /** Adds a grid item to the layout */
  addItemToLayout(item) {
    // const maxId = this.layout.reduce(
    //   (acc, cur) => Math.max(acc, parseInt(cur.id, 10)),
    //   -1
    // );
    // const nextId = maxId + 1;
    const nextId = this.typeArray.length;

    const newLayoutItem: KtdGridLayoutItem = {
      id: nextId.toString(),
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
    };

    // Important: Don't mutate the array, create new instance. This way notifies the Grid component that the layout has changed.
    this.layout = [newLayoutItem, ...this.layout];
    //this.typeArray.push(item);
    this.typeArray = [...this.typeArray, item]
    this.testService.layoutUpdated(this.layout);
    this.testService.typeArrayUpdated(this.typeArray)
    console.log('*: typeA', this.typeArray)
    console.log('*: addlay', this.layout)
  //  if (!this.testService.itemInCart(item)) {
  //   //item.qtyTotal = 1;
  //   this.testService.addToTest(item); //add items in cart
  //   this.layout = [...this.testService.getItems()];
  //    console.log('layout: ', this.layout);
  // }
}
 //----- clear cart item
 clearCart(items) {
 // this.items.forEach((item, index) => this.testService.removeItem(index));
 this.testService.clearCart(items);
 this.layout = [...this.testService.getItems()];
 this.typeArray = [...this.testService.gettypeArray()];
}
  /** Removes the item from the layout */
  removeItem(id: string) {
    // Important: Don't mutate the array. Let Angular know that the layout has changed creating a new reference.
    this.layout = ktdArrayRemoveItem(this.layout, (item) => item.id === id);
    this.testService.removeItem(id)
    this.testService.layoutUpdated(this.layout);
    this.testService.typeArrayUpdated(this.typeArray)
    console.log('remove layout ', this.layout)
  }
}
