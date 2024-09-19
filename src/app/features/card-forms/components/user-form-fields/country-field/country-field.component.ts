import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { Observable, OperatorFunction, debounceTime, map, of } from 'rxjs';
import { Country } from '../../../../../shared/enum/country';

@Component({
  selector: 'app-country-field',
  templateUrl: './country-field.component.html',
  styleUrl: './country-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CountryFieldComponent),
    },
  ],
})
export class CountryFieldComponent implements ControlValueAccessor {
  @ViewChild('country') field: ElementRef | undefined;
  value: string = '';

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : [...Object.keys(Country)].filter((country) =>
              country.toLowerCase().includes(term.toLocaleLowerCase())
            )
      )
    );

  formatter = (x: string) => x;

  constructor(private renderer: Renderer2) {}

  onChange = (value: string) => {};
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

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.field?.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
