import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  image: Observable<string>;
  refreshingImage: Observable<boolean>;
  constructor(private $s: AppService, private $d: DomSanitizer) {}

  ngOnInit() {
    this.refreshingImage = this.$s.refreshingImage;
    this.image = this.$s.image;
    this.$s.fetchRandomImage().subscribe(v => {
      this.$s.image.next(`url(${v})`);
    });
  }
}
