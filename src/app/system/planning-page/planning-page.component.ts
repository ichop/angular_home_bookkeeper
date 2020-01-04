import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {HBKEvent} from '../shared/models/event.model';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {Category} from '../shared/models/category.model';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'hbk-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: HBKEvent[] = [];

   s1: Subscription;

  constructor(
    private billService: BillService,
    private categoryService: CategoriesService,
    private eventService: EventsService
  ) {
  }

  ngOnInit() {
   this.s1 = combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], HBKEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCategoryCost(cat: Category): number {
  const catEvent = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
  return catEvent.reduce((total, e ) => {
  total += e.amount;
  return total;
  }, 0);
  }

  getCatColorClass(cat: Category): string {
    const percent =  this.getPercent(cat);
    return  percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';

  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }



}
