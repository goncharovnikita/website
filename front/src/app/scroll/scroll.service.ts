import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ScrollService {
  registeredKeys: BehaviorSubject<ElementRef[]> = new BehaviorSubject([]);
  registeredContainers: BehaviorSubject<ElementRef[]> = new BehaviorSubject([]);

  registerContainer(el: ElementRef) {
    this.registeredContainers.next([...this.registeredContainers.getValue(), el]);
  }

  registerKey(el: ElementRef) {
    this.registeredKeys.next([...this.registeredKeys.getValue(), el]);
  }
}
