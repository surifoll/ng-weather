import { createAction, props } from '@ngrx/store';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { CurrentConditions } from 'app/current-conditions/current-conditions.type';
import { Forecast } from 'app/forecasts-list/forecast.type';

export const addCurrentConditions = createAction(
  '[Weather] Add Current Conditions',
  props<{ zipcode: string; conditions?: CurrentConditions}>()
);

export const removeCurrentConditions = createAction(
  '[Weather] Remove Current Conditions',
  props<{ zipcode: string }>()
);
// Action to initiate loading weather
export const loadWeather = createAction('[Weather] Load Weather', props<{ zipcode: string }>());

// Action dispatched on successful weather data retrieval
export const loadWeatherSuccess = createAction('[Weather] Load Weather Success', props<{ conditionwithZip: ConditionsAndZip }>());

// Action dispatched on failure to load weather data
export const loadWeatherFailure = createAction('[Weather] Load Weather Failure', props<{ error: any }>());



export const loadForecast = createAction('[Forecast ] Get Forecast', props<{ zipcode: string }>());

// Action dispatched on successful weather data retrieval
export const loadForecastSuccess = createAction('[Forecast] Load Forecast Success', props<{ forecast: Forecast, zipcode: string }>());

// Action dispatched on failure to load weather data
export const loadForecastError = createAction('[Forecast] Load Forecast Failure', props<{ error: any }>());