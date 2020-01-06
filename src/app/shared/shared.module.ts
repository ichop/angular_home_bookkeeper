import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, NgxChartsModule],
  exports: [ReactiveFormsModule, FormsModule, HttpClientModule, NgxChartsModule, LoaderComponent]
})
export class SharedModule {

}
