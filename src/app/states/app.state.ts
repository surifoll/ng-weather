import { ActionReducerMap } from '@ngrx/store';
import * as fromLocation from '../reducers/location.reducer';
import * as fromWeather from '../reducers/weather.reducer';

export interface AppState {
  location: fromLocation.LocationState;
  weather: fromWeather.WeatherState;
}

export const reducers: ActionReducerMap<AppState> = {
  location: fromLocation.locationReducer,
  weather: fromWeather.weatherReducer,
};