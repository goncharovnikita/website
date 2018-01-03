import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentService {
  private readonly GET_MEDIUM_FEED = 'get/medium/feed';
  constructor(
    private $h: HttpClient,
    @Inject('BASE_URL') private baseURL: string
  ) {}

  fetchMediumFeed(): Observable<mediumFeed> {
    // return Observable.of(<mediumFeed>{
    //   status: 'ok',
    //   items: [
    //     {
    //       title: 'TEST TITLE'
    //     }
    //   ]
    // });
    return this.$h.get(this.baseURL + this.GET_MEDIUM_FEED).map(r => <mediumFeed>r);
  }
}
