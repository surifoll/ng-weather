import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import {LocationService} from "./location.service";
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import {WeatherService} from "./weather.service";
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { MainPageComponent } from './main-page/main-page.component';
import {RouterModule} from "@angular/router";
import {routing} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { locationReducer } from './reducers/location.reducer';
import { weatherReducer } from './reducers/weather.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './effects/weather.effect';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tab/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    TabComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot( {locations: locationReducer, weather: weatherReducer}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([WeatherEffects]),
  ],
  providers: [LocationService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
