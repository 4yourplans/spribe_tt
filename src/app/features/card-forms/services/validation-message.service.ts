import { Injectable } from '@angular/core';

@Injectable()
export class ValidationMessageService {
  fieldValidationMessage = '';
  public errorFieldNamesToMessageMapper: { [key: string]: string } = {
    'country': 'Please provide a correct Country',
    'username': 'Please provide a correct Username',
    'birthday': 'Please provide a correct Birthday',
  };
}
