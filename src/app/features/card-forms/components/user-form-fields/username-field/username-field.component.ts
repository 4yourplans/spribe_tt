import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { UserService } from '../../../services/user.service';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-username-field',
  templateUrl: './username-field.component.html',
  styleUrl: './username-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UsernameFieldComponent),
    },
  ],
})
export class UsernameFieldComponent implements ControlValueAccessor {
  value: string = '';
  @ViewChild('username') field: ElementRef | undefined;
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
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.field?.nativeElement,
      'disabled',
      isDisabled
    );
  }
  change(event: any) {
    this.onChange(event.target.value);
    this.onTouched();
  }
}
