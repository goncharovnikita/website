import { ScrollService } from './scroll.service';
import { Directive, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[appScrollContainer]'
})
export class ScrollContainerDirective {
  constructor(private el: ElementRef, private $s: ScrollService) {
    this.$s.registerContainer(el);
    this.addScrollListened(el);
  }

  addScrollListened(el: ElementRef) {
    Observable.fromEvent(el.nativeElement, 'scroll')
      .subscribe(e => {
        const scrollTop = this.el.nativeElement.scrollTop;
        const offset = this.el.nativeElement.offsetTop;
        const off1 = this.el.nativeElement.children[0].offsetTop;
        const off2 = this.el.nativeElement.children[1].offsetTop;
        const off3 = this.el.nativeElement.children[2].offsetTop;

        switch (true) {
          case scrollTop - 100 > off1 && scrollTop + offset < off2:
            this.el.nativeElement.scrollTo(0, off2 - offset);
            console.log(scrollTop, off2);
            break;
          case scrollTop - 100 > off2 && scrollTop + offset < off3:
            this.el.nativeElement.scrollTo(0, off3 - offset);
            break;
        }
      });
  }
}
