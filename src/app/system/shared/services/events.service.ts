import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApi} from '../../../shared/core/base-api';
import {HBKEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: HBKEvent): Observable<HBKEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<HBKEvent[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<HBKEvent> {
    return this.get(`events/${id}`);
  }

}
