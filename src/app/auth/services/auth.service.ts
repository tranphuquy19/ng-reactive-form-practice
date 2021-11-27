import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

export type AuthControlTypes = 'username' | 'password';

export interface IGithubProfile {
  login: string;
  id: number;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient
  ) { }

  /*
  * Validate username and password, return true if valid
  * @param {string} username
  * @returns {boolean}
  * */
  public validateUsername(username: string): boolean {
    // regex username string, start with letter, contain letters and numbers, min length 5, max length 20
    const regex = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;
    return regex.test(username);
  }

  /*
  * Validate password, return true if valid
  * @param {string} password
  * @returns {boolean}
  * */
  public validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,50}/;
    return regex.test(password);
  }

  authValidator(field: AuthControlTypes): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      switch (field) {
        case 'username': {
          return this.validateUsername(control.value) ? null : { 'invalidUsername': true };
        }
        case 'password': {
          return this.validatePassword(control.value) ? null : { 'invalidPassword': true };
        }
        default: {
          return null;
        }
      }
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 404) {
      return of(false);
    }
    // return false to indicate that the request failed
    return throwError(() => error);
  }

  private getGithubUser(username: string): Observable<IGithubProfile> {
    return this.httpClient.get<IGithubProfile>(`https://api.github.com/users/${username}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  login(value: any): Observable<IGithubProfile> {
    return this.getGithubUser(value.username)
      .pipe(
        map(user => {
          return user;
        })
      );
  }
}
