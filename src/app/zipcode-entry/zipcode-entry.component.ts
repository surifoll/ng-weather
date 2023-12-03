import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import {Store} from "@ngrx/store";
import * as LocationActions from 'app/states/actions/location.actions';
import * as WeatherActions from 'app/states/actions/weather.actions';
import { AppState } from 'app/states/app.state';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  constructor(private store: Store<AppState>) { }

  @ViewChild('zipcode') public zipcode: ElementRef;

  addLocation(zipcode: string) {
    this.store.dispatch(LocationActions.addLocation({ zipcode }));
    this.store.dispatch(WeatherActions.loadWeather({ zipcode }));
    this.zipcode.nativeElement['value'] = ""
  }
  
  
}
