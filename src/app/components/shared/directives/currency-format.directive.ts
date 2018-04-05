import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[CurrencyFormatter]'
})
export class CurrencyFormatter {
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/-?[0-9]+(\.[0-9]*){0,1}$/g);

  @Input() CurrencyFormatter: boolean;
  @Input() ngModel: string;

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', '.', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home  and dash keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      let index = String(this.ngModel).indexOf('-');
      let indexOfDot = String(this.ngModel).indexOf('.');
      if (event.key === '-' && this.ngModel) {
        if (index >= 0) {
          event.preventDefault();
        }
        if (index === -1 && event.key === '-') {
          return;
        }
      } else if (event.key === '.' && this.ngModel) {
        if (indexOfDot >= 0) {
          event.preventDefault();
        }
        if (indexOfDot === -1 && event.key === '.') {
          return;
        }
      } else {
        return;
      }
    }

    let p = this.decimalPlaces(this.ngModel)
    if (p > 1) {
      event.preventDefault();
    }

    let e = <KeyboardEvent>event;
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
  decimalPlaces(num) {
    let match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.max(
      0,
      // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0)
      // Adjust for scientific notation.
      - (match[2] ? +match[2] : 0));
  }
}
