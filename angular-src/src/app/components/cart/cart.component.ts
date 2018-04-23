import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() public cart: any;
  @Input() public isOrder: boolean;
  public totalPrice: number;
  public searchValue: string = '';

  constructor() { }

  ngOnInit() {
  }
}
