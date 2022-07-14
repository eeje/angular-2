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
//import { TestService } from './test.service'

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
      {id: '0', x: 0, y: 0, w: 3, h: 3},
      {id: '1', x: 3, y: 0, w: 3, h: 4},
      {id: '2', x: 6, y: 0, w: 3, h: 5},
      {id: '3', x: 9, y: 0, w: 3, h: 6}
  ];
  private resizeSubscription: Subscription;
  data: any;
  options: any;
  constructor(
    private ngZone: NgZone,
   // public testService: TestService,
    public elementRef: ElementRef,
    @Inject(DOCUMENT) public document: Document
  ) {
    // this.ngZone.onUnstable.subscribe(() => console.log('UnStable'));
  }
  ngOnInit() {
  //  this.testService.loadCart();
   // this.layout =this.testService.getItems();
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
    console.log('layout', layout);
    this.layout = layout;
  }

  onLayoutUpdated(layout: KtdGridLayout) {
    console.log('on layout updated', layout);
    this.layout = layout;
  }
  /** Adds a grid item to the layout */
  addItemToLayout(item) {
    const maxId = this.layout.reduce(
      (acc, cur) => Math.max(acc, parseInt(cur.id, 10)),
      -1
    );
    const nextId = maxId + 1;

    const newLayoutItem: KtdGridLayoutItem = {
      id: nextId.toString(),
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
    };

    // Important: Don't mutate the array, create new instance. This way notifies the Grid component that the layout has changed.
    this.layout = [newLayoutItem, ...this.layout];
  //  if (!this.testService.itemInCart(item)) {
  //   //item.qtyTotal = 1;
  //   this.testService.addToTest(item); //add items in cart
  //   this.layout = [...this.testService.getItems()];
     console.log('layout: ', this.layout);
  // }
}
 //----- clear cart item
 //clearCart(items) {
  // this.items.forEach((item, index) => this.cartService.removeItem(index));
 // this.testService.clearCart(items);
 // this.layout = [...this.testService.getItems()];
//}

}
