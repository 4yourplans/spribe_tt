import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Observable, map, of } from 'rxjs';

@Injectable()
export class UserNameValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.value == '') return of(null);
    return this.userService
      .validateUserName(control.value)
      .pipe(
        map((responseData) =>
          responseData.isAvailable ? null : { notUniqueName: true }
        )
      );
  }
}
