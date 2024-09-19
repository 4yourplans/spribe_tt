import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckUserResponseData, SubmitFormResponseData } from '../../../shared/interface/responses';
import { IUser } from '../interfaces/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  validateUserName(username: string): Observable<{ isAvailable: boolean }> {
    return this.http.post('/api/checkUsername', { username }) as Observable<CheckUserResponseData>;
  }

  submitUserForms(usersData:IUser[]){
    return this.http.post('/api/submitForm', usersData) as Observable<SubmitFormResponseData>;
  }
} 
