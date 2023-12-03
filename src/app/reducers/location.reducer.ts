import { createReducer, on } from '@ngrx/store';
import * as LocationActions from '../states/actions/location.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLocation from './location.reducer';

export interface LocationState {
  locations: string[];
}

export const initialLocationState: LocationState = {
  locations: [],
};

export const selectLocationState = createFeatureSelector<fromLocation.LocationState>('location');

export const selectLocations = createSelector(
  selectLocationState,
  state => state.locations
);


export const locationReducer = createReducer(
  initialLocationState,
  on(LocationActions.addLocation, (state, { zipcode }) => ({
    ...state,
    locations: [...state.locations, zipcode],
  })),
  on(LocationActions.removeLocation, (state, { zipcode }) => ({
    ...state,
    locations: state.locations.filter(loc => loc !== zipcode),
  }))
);
