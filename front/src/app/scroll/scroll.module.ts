import { ScrollContainerDirective } from './scroll-container.directive';
import { ScrollService } from './scroll.service';
import { CommonModule } from '@angular/common';
import { ScrollKeyDirective } from './scroll-key.directive';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScrollKeyDirective,
    ScrollContainerDirective
  ],
  exports: [
    ScrollKeyDirective,
    ScrollContainerDirective
  ],
  providers: [
    ScrollService
  ]
})
export class ScrollModule {}
