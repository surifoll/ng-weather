import { Component, inject, OnInit, Signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { WeatherService } from "../weather.service";
import { Router } from "@angular/router";
import { AppState } from 'app/states/app.state';
import { LocationState, selectLocationState } from 'app/reducers/location.reducer';
import { selectCurrentConditions } from 'app/reducers/weather.reducer';
import { Observable } from 'rxjs';
import * as WeatherActions from '../states/actions/weather.actions';
import { DynamicFuctionModel } from 'app/forecasts-list/forecast.type';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {
  constructor(private store: Store<AppState>) {

  }

  myConfig: DynamicFuctionModel[] = [];
  currentIndex: number = 0;
  locations$: Observable<LocationState>;
  currentConditions$ = this.store.select(selectCurrentConditions);
  ngOnInit() {
    this.locations$ = this.store.select(selectLocationState);
    this.currentConditionsByZip$ = this.store.pipe(select(selectCurrentConditions)).pipe(
      tap((data) => data.forEach(rec => this.myConfig.push({
        name: "removeLocation",
        key: rec.zip,
        outputHandler: this.removeLocation
      }))
      ));
  }

  private router = inject(Router);
  protected currentConditionsByZip$;


  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }

  setIndex(index: number) {
    this.currentIndex = index;
  }

  removeLocation = (zipcode: string) =>
    this.store.dispatch(WeatherActions.removeCurrentConditions({ zipcode }));

}
