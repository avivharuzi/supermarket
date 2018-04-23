import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BASE_CART_URL } from '../../constants/urls';

import { Item } from '../../models/item.model';

import { ItemService } from '../item/item.service';
import { ActionService } from '../action/action.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class CartService {
  public cart: any;
  public isCart: boolean;
  public lastOrder: any;

  constructor(
    private http: HttpClient,
    private itemService: ItemService,
    private actionService: ActionService
  ) {
    this.onSelectedCartItem();
    this.onRemoveCartItem();
    this.onUpdateCartItem();
    this.onCleanCart();
  }

  getCart() {
    this.http.get(BASE_CART_URL).subscribe((res: any) => {
      if (res) {
        if (!res.orderDate) {
          this.cart = res;
          this.calcTotalPrice();
          this.isCart = true;
        } else {
          this.isCart = false;
          this.lastOrder = res;
        }
      } else {
        this.isCart = false;
      }
    });
  }

  setCart() {
    this.http.post(BASE_CART_URL, null).subscribe((res: any) => {
      if (res) {
        this.cart = res;
        this.calcTotalPrice();
        this.isCart = true;
      } else {
        this.isCart = false;
      }
    });
  }

  onSelectedCartItem() {
    this.actionService.selectedCartItem.subscribe((product: any) => {
      let existItem = this.checkIfItemAlreadyChoosed(product);
      if (!existItem) {
        const item = new Item(product._id, 1);
        this.itemService.addItem(item).subscribe((res) => {
          this.cart.items.push(res.data);
          this.calcTotalPrice();
        });
      } else {
        existItem.amount += 1;
        this.actionService.updatedCartItem.next(existItem);
      }
    });
  }

  onRemoveCartItem() {
    this.actionService.removeCartItem.subscribe((item: any) => {
      this.itemService.deleteItem(item._id).subscribe((res: any) => {
        this.cart.items.splice(this.cart.items.indexOf(item), 1);
        this.calcTotalPrice();
      });
    });
  }

  onUpdateCartItem() {
    this.actionService.updatedCartItem.subscribe((item: any) => {
      this.itemService.updateItem(item._id, item).subscribe((res: any) => {
        let foundIndex = this.cart.items.findIndex(x => x._id === item._id);
        this.cart.items[foundIndex] = res.data;
        this.calcTotalPrice();
      });
    });
  }

  onCleanCart() {
    this.actionService.cleanCart.subscribe(() => {
      this.itemService.deleteAllItems().subscribe((res: any) => {
        this.cart.items = [];
        this.calcTotalPrice();
      });
    });
  }

  checkIfItemAlreadyChoosed(product) {
    if (this.cart.items.length) {
      for (let item of this.cart.items) {
        if (item.product._id === product._id) {
          return item;
        }
      }
    }
    return false;
  }

  calcTotalPrice() {
    if (this.cart && this.cart.items.length) {
      this.cart.totalPrice = 0;
      for (let item of this.cart.items) {
        this.cart.totalPrice += item.price;
      }
    } else {
      this.cart.totalPrice = 0;
    }
  }

  resetCart() {
    this.cart = null;
    this.isCart = null;
    this.lastOrder = null;
  }
}
