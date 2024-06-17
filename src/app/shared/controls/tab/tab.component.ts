import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from "rxjs";

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() title = '';
  visible = signal(true);
  public obs$ = of([1,2,3]);
}
