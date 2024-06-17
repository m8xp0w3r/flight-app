import {
  AfterViewInit,
  Component,
  ContentChildren,
  effect,
  inject,
  QueryList,
  Signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../tab/tab.component';
import { TabNavigatorComponent } from '../tab-navigator/tab-navigator.component';
import { TabbedPaneService } from "./tabbed-pane.service";

@Component({
  selector: 'app-tabbed-pane',
  standalone: true,
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.css'],
  imports: [CommonModule, TabNavigatorComponent],
})
export class TabbedPaneComponent implements AfterViewInit {
  @ContentChildren(TabComponent)
  tabQueryList: QueryList<TabComponent> | undefined;

  @ViewChild('navigator')
  navigator: TabNavigatorComponent | undefined;
  service: TabbedPaneService = inject(TabbedPaneService);

  activeTab: TabComponent | undefined;

  currentPage: Signal<number> = this.service.currentPage
  activeTabIndex = this.service.activeTab;

  constructor() {
    effect(() => {
      this.activate(this.tabs[this.activeTabIndex()]);
    }, {allowSignalWrites: true});
  }

  get tabs(): TabComponent[] {
    return this.tabQueryList?.toArray() ?? [];
  }

  activate(active: TabComponent): void {
    for (const tab of this.tabs) {
      tab.visible = tab === active;
    }
    this.activeTab = active;
  }

  ngAfterViewInit(): void {
    this.service.setPageCount(this.tabs.length);
  }
}
