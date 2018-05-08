import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFixedTop]'
})
export class FixedTopDirective implements OnInit {
  constructor(
    public el: ElementRef
  ) { }

  ngOnInit() {
    let vm = this;
    let sticky = vm.el.nativeElement.offsetTop;

    window.onscroll = function() {
      if (window.pageYOffset >= sticky) {
        vm.el.nativeElement.classList.add('fixed');
      } else {
        vm.el.nativeElement.classList.remove('fixed');
      }
    };
  }
}
