import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../states/actions/weather.actions';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWeather from './weather.reducer';

export const selectWeatherState = createFeatureSelector<fromWeather.WeatherState>('weather');

export const selectCurrentConditions = createSelector(
  selectWeatherState,
  state => state?.currentConditions
);

export interface WeatherState {
  currentConditions: ConditionsAndZip[];
}

export const initialWeatherState: WeatherState = {
  currentConditions: [],
};

export const weatherReducer = createReducer(
  initialWeatherState,
  on(WeatherActions.addCurrentConditions, (state, { zipcode, conditions }) => ({
    ...state,
    currentConditions: [...state.currentConditions, { zip: zipcode, data: conditions }],
  })),
  on(WeatherActions.removeCurrentConditions, (state, { zipcode }) => ({
    ...state,
    currentConditions: state.currentConditions.filter(condition => condition.zip !== zipcode),
  })),
  on(WeatherActions.loadWeatherSuccess, (state, { conditionwithZip }) => {
    return ({
      ...state,
      currentConditions: [...state.currentConditions, conditionwithZip],
    })
  }),
  on(WeatherActions.loadForecastSuccess, (state, { forecast, zipcode }) => {
    const conditionsAndZips = state.currentConditions.map((item) =>
      item.zip === zipcode ? { ...item, forecast } : item
    );
    return ({
      ...state,
      currentConditions: conditionsAndZips
    })
  })

);
