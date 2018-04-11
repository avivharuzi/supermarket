import { Component, OnInit } from '@angular/core';
import { OverallService } from '../../services/overall/overall.service';

@Component({
  selector: 'app-store-count',
  templateUrl: './store-count.component.html',
  styleUrls: ['./store-count.component.scss']
})
export class StoreCountComponent implements OnInit {
  public products: number;
  public orders: number;

  constructor(
    private overallService: OverallService
  ) { }

  ngOnInit() {
    this.getOverallProducts();
    this.getOverallOrders();
  }

  getOverallProducts() {
    this.overallService.getOverallProducts().subscribe((res: any) => {
      this.products = res.data;
    });
  }

  getOverallOrders() {
    this.overallService.getOverallOrders().subscribe((res: any) => {
      this.orders = res.data;
    });
  }
}
