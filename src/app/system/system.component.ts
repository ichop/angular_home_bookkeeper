import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'hbk-system',
  templateUrl: './system.component.html'
})
export class SystemComponent {
  @HostBinding('@fade') a = true;
}
