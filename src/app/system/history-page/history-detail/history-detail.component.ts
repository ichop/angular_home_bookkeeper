import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {HBKEvent} from '../../shared/models/event.model';
import {mergeMap} from 'rxjs/operators';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'hbk-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: HBKEvent;
  category: Category;

  isLoaded = false;
  s1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit() {
    this.s1 = this.route.params
      .pipe(mergeMap((params: Params) => this.eventService.getEventById(params.id)),
        mergeMap((event: HBKEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
    }))
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
