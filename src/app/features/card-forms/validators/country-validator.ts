import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Country } from '../../../shared/enum/country';

@Injectable()
export class CountryValidator implements AsyncValidator {
  constructor() {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (
      control.value === '' ||
      control.value === null ||
      control.value === undefined
    )
      return of(null);
    return of(Object.keys(Country)).pipe(
      map((countries) =>
        countries.includes(control.value) ? null : { notUniqueName: true }
      )
    );
  }
}
