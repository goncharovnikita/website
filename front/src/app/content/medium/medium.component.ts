import { ContentService } from './../content.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-content-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.sass']
})
export class MediumContentComponent implements OnInit {
  feed: BehaviorSubject<mediumFeed> = new BehaviorSubject(null);

  constructor(private $s: ContentService) {}
  ngOnInit() {
    // this.$s.fetchMediumFeed()
    //   .catch(e => {
    //     console.log(e);
    //     return Observable.of(null);
    //   })
    //   .subscribe(f => this.feed.next(f));
  }
}
