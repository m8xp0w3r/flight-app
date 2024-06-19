import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, Input, Output } from '@angular/core';
import { Dialog } from "@angular/cdk/dialog";
import { ConfirmComponent } from "../confirm/confirm.component";


@Directive({
  selector: '[appClickWithWarning]',
  exportAs: 'clickWithWarning',
  standalone: true,
})
export class ClickWithWarningDirective {
  dialog = inject(Dialog);
  @Input() warning = 'Are you sure?';
  @Output() appClickWithWarning = new EventEmitter<void>();

  elementRef = inject(ElementRef);

  @HostBinding('class') classBinding = 'btn btn-outline-secondary';

  @HostListener('click', ['$event.shiftKey'])

  handleClick(shiftKey: boolean): void {
    if (shiftKey) {
      this.appClickWithWarning.emit();
      return;
    }

    const ref = this.dialog.open<boolean>(ConfirmComponent, {
      data: this.warning,
    });
    ref.closed.subscribe((result) => {
      if (result) {
        this.appClickWithWarning.emit();
      }
    });
  }
}
