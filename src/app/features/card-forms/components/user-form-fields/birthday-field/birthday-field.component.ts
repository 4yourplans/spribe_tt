import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-birthday-field',
  templateUrl: './birthday-field.component.html',
  styleUrl: './birthday-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BirthdayFieldComponent),
    },
  ],
})
export class BirthdayFieldComponent implements ControlValueAccessor {
  value: string = '';
  @ViewChild('birthday') field: ElementRef | undefined;

  constructor(private renderer: Renderer2) {}

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  change(event: any) {
    this.onChange(event.target.value);
  }

  blur() {
    this.onTouched();
  }

  onDateSelect(event: NgbDateStruct) {
    this.onChange(this.parseDate(event));
  }

  private parseDate(date: NgbDateStruct) {
    return new Date(date.year, date.month - 1, date.day).toJSON();
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.field, 'disabled', isDisabled);
  }
}
