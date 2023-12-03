import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';
import * as WeatherActions from 'app/states/actions/weather.actions';

import {Store, select} from "@ngrx/store";
import { AppState } from 'app/states/app.state';
import { Observable } from 'rxjs';
import { selectCurrentConditions } from 'app/reducers/weather.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent implements OnInit {

  zipcode: string;
  forecast$: Observable<Forecast>;
  icon: string;

  constructor(protected store: Store<AppState>, route : ActivatedRoute) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      this.store.dispatch(WeatherActions.loadForecast({ zipcode: this.zipcode}))
    });
  }
  ngOnInit(): void {
    this.forecast$ =  this.store.pipe(select(selectCurrentConditions))
    .pipe(map(data => {

      
      const currentlocation = data.find(cond => cond.zip == this.zipcode)
      this.icon = currentlocation?.data.icon;
      console.log(currentlocation);
     return  currentlocation?.forecast
    }))
  }

  
}
