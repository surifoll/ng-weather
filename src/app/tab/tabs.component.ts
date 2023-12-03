import { Component, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { TabComponent } from './tab.component';
import { DynamicFuctionModel } from 'app/forecasts-list/forecast.type';


@Component({
  selector: 'app-tabs',
  styleUrls: ['./tabs.component.css'],
 templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();
  @Input() tabConfigs: DynamicFuctionModel[];

  action(key: string) {
    console.log(this.tabConfigs);
    const config = this.tabConfigs.find(c => c.key == key);
    config.outputHandler(config.key);
    this.selectTab(this.tabs.first);
  }
  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    if (this.tabs && tab) {
      this.tabs.toArray().forEach(t => (t.active = false));
      tab.active = true;
    }
  }

}
