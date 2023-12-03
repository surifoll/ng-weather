
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  styleUrls: ['./tab.component.css'],
  templateUrl: './tab.component.html',
})
export class TabComponent {
  @Input() active: boolean = false;
  @Input() key: string = '';
  @Input() title: string = '';

  
}


