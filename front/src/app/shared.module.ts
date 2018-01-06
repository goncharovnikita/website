import { CommonModule } from '@angular/common';
import { ScrollModule } from './scroll/scroll.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';
import { AppService } from './app.service';


@NgModule({
  exports: [
    ScrollModule,
    CommonModule
  ],
  providers: [
    AppService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
