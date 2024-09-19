import { Component, Input, SimpleChange } from '@angular/core';
import { ValidationMessageService } from '../../services/validation-message.service';

@Component({
  selector: 'app-form-control-validation-message',
  templateUrl: './form-control-validation-message.component.html',
  styleUrl: './form-control-validation-message.component.scss'
})
export class FormControlValidationMessageComponent {
  validationMessage = ''
  constructor(private validationMessageService: ValidationMessageService){
    this.validationMessage = this.validationMessageService.fieldValidationMessage
  }
}
