import { Component, OnInit, Input } from '@angular/core';

import { IMAGES_PATH } from '../../constants/urls';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  @Input() public src: string;
  @Input() public width: number;
  @Input() public height: number;
  @Input() public class: string;

  constructor() {}

  ngOnInit() {
    this.src = IMAGES_PATH + '/' + this.src;
  }
}
