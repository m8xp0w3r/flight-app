import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbedPaneService } from "../tabbed-pane/tabbed-pane.service";

@Component({
  selector: 'app-tab-navigator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigatorComponent {
  service = inject(TabbedPaneService);

  pageCount = this.service.pageCount;
  currentPage = this.service.currentPage;

  prev(): void {
    this.service.prev();
  }

  next(): void {
    this.service.next();
  }
}
