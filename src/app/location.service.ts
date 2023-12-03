import { Injectable } from '@angular/core';
import { addLocation } from 'app/states/actions/location.actions';
import { AppState } from 'app/states/app.state';
import { Store, select } from "@ngrx/store";
import { addCurrentConditions, removeCurrentConditions } from './states/actions/weather.actions';
import { Observable } from 'rxjs';
import { selectLocations } from './reducers/location.reducer';

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {

  locations: string[] = [];

  constructor(private store: Store<AppState>) {
  
  }
  get locations$(): Observable<string[]> {
    return this.store.pipe(select(selectLocations));
  }
  
  addLocation(zipcode: string) {

    
    this.store.dispatch(addCurrentConditions({ zipcode }));
  }

  removeLocation(zipcode: string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.store.dispatch(removeCurrentConditions({ zipcode }));
    }
  }

  dispatchAddLocation(zipcode: string) {
    this.store.dispatch(addLocation({ zipcode }));
  }



}
