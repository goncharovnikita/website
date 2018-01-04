import { ScrollService } from './scroll.service';
import { Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[appScrollKey]'
})
export class ScrollKeyDirective {
  constructor(private el: ElementRef, private $s: ScrollService) {
    this.$s.registerKey(el);
  }
}
