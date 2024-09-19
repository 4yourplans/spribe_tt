import { Component } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  Subscription,
  empty,
  interval,
  map,
  mapTo,
  merge,
  of,
  scan,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs';
import { UserNameValidator } from '../../validators/user-name-validator';
import { CountryValidator } from '../../validators/country-validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
})
export class CardFormComponent {
  destroyed$ = new Subject();

  countDownTimer = 5;

  displayedSeconds = 5;

  invalidFormsCounter = 0;

  submitInProgress = false;

  submitInProgress$ = new BehaviorSubject(false);

  interval$ = interval(1000).pipe(mapTo(-1));

  formData = this.fb.group({
    userForms: this.fb.array([]) as FormArray,
  });
  constructor(
    private fb: FormBuilder,
    private userNameValidator: UserNameValidator,
    private countryValidator: CountryValidator,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscribeToFormErrors();
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }

  get userForms(): FormArray<FormGroup> {
    return this.formData.controls['userForms'] as FormArray;
  }

  addUserForm(): void {
    const userFormInitial = this.fb.group({
      country: [
        '',
        {
          validators: [],
          asyncValidators: [
            this.countryValidator.validate.bind(this.userNameValidator),
          ],
          updateOn: 'blur',
        },
      ],
      username: [
        '',
        {
          validators: [],
          asyncValidators: [
            this.userNameValidator.validate.bind(this.userNameValidator),
          ],
          updateOn: 'blur',
        },
      ],
      birthday: ['', { validators: [] }],
    });
    this.formData.controls['userForms'].push(userFormInitial);
  }

  deleteUserForm(index: number, form: any) {
    this.formData.controls['userForms'].removeAt(index);
  }

  submitAllForms() {
    this.submitInProgress = true;
    this.toggleFormControls(true);
    this.submitInProgress$.next(true);
    this.startTimer();
  }

  cancelSubmit() {
    this.submitInProgress$.next(false);
    this.submitInProgress = false;
    this.toggleFormControls(false);
    this.displayedSeconds = 5;
  }

  private subscribeToFormErrors(): void {
    this.formData.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((status) => {
        if (status === 'INVALID') {
          this.invalidFormsCounter = this.userForms.controls.filter(
            (control) => control.status === 'INVALID'
          ).length;
        } else if (status === 'VALID') {
          this.invalidFormsCounter = 0;
        }
      });
  }

  private toggleFormControls(isDisabled: boolean): void {
    this.userForms.controls.forEach((form: FormGroup) => {
      if (isDisabled) {
        form.disable();
      } else {
        form.enable();
      }
    });
  }

  startTimer() {
    const timer$ = this.submitInProgress$
      .pipe(
        switchMap((val) => {
          return val
            ? this.interval$
            : of(null).pipe(
                map((d) => {
                  timer$.unsubscribe();
                  return d;
                })
              );
        }),
        scan((acc, curr) => (curr ? curr + acc : acc), this.countDownTimer),
        takeWhile((v) => {
          if (v === -1) {
            this.handleSubmit();
          }
          return v >= 0;
        })
      )
      .subscribe((val: any) => {
        this.displayedSeconds = val;
      });
  }

  private handleSubmit() {
    const response$ = this.userService.submitUserForms(this.userForms.value);
    response$.subscribe((res) => {
      if (res.result === 'nice job') {
        this.submitInProgress = false;
        this.toggleFormControls(false);
        this.userForms.clear();
      }
    });
  }
}
