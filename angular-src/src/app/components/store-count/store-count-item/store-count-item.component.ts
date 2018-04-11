import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-store-count-item',
  templateUrl: './store-count-item.component.html',
  styleUrls: ['./store-count-item.component.scss']
})
export class StoreCountItemComponent implements OnInit {
  @Input() public name: string;
  @Input() public count: number;

  constructor() { }

  ngOnInit() {
  }
}
