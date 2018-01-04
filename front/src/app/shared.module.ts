import { CommonModule } from '@angular/common';
import { ScrollModule } from './scroll/scroll.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import 'rxjs/add/observable/fromEvent';


@NgModule({
  exports: [
    ScrollModule,
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
