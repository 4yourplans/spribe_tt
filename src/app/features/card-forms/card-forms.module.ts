import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { CardFormsRoutingModule } from './card-forms-routing.module';
import { CardFormComponent } from './components/card-form/card-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CountryFieldComponent } from './components/user-form-fields/country-field/country-field.component';
import { UsernameFieldComponent } from './components/user-form-fields/username-field/username-field.component';
import { UserService } from './services/user.service';
import { BirthdayFieldComponent } from './components/user-form-fields/birthday-field/birthday-field.component';
import { ValidationMessageService } from './services/validation-message.service';
import { CountryValidator } from './validators/country-validator';
import { UserNameValidator } from './validators/user-name-validator';
import { FormControlValidationDirective } from './directives/form-control-validation.directive';
import { FormControlValidationMessageComponent } from './shared/form-control-validation-message/form-control-validation-message.component';

@NgModule({
  declarations: [
    CardFormComponent,
    CountryFieldComponent,
    UsernameFieldComponent,
    BirthdayFieldComponent,
    FormControlValidationDirective,
    FormControlValidationMessageComponent,
  ],
  imports: [
    CommonModule,
    CardFormsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbAlertModule,
    NgbTypeaheadModule,
    JsonPipe,
  ],
  providers: [
    UserService,
    ValidationMessageService,
    CountryValidator,
    UserNameValidator,
  ],
})
export class CardFormsModule {}
