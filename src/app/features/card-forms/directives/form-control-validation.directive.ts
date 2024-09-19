import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidationMessageService } from '../services/validation-message.service';
import { Observable, Subscription, filter, first } from 'rxjs';
import { FormControlValidationMessageComponent } from '../shared/form-control-validation-message/form-control-validation-message.component';

@Directive({
  selector: '[appFormControlValidation]',
})
export class FormControlValidationDirective
  implements AfterViewInit, OnDestroy
{
  statusChangeSubscription$: Subscription | undefined;

  constructor(
    private elRef: ElementRef,
    private control: NgControl,
    private validationMessageService: ValidationMessageService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {
    this.statusChangeSubscription$ = this.control.statusChanges?.subscribe(
      (status) => {
        if (this.control.value === '') return;
        if (status === 'INVALID') {
          this.viewContainerRef.clear();
          this.elRef.nativeElement.style.borderColor = 'red';
          this.validationMessageService.fieldValidationMessage =
            this.validationMessageService.errorFieldNamesToMessageMapper[
              this.control.name as string
            ];
          this.viewContainerRef.createComponent(
            FormControlValidationMessageComponent
          );
        } else {
          // basic border color for ngb inputs
          this.elRef.nativeElement.style.borderColor = '#dee2e6';
          this.viewContainerRef.clear();
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.statusChangeSubscription$?.unsubscribe();
  }
}
