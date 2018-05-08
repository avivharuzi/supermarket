import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public isActive: boolean;

  constructor() {
    this.isActive = true;
  }

  ngOnInit() {
  }
}
