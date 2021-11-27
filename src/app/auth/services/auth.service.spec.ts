import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const INVALID_USERNAMES = ['', 'a', 'aaaa', '1asd', '12345'];
  const VALID_USERNAMES = ['tranphuquy19'];

  const INVALID_PASSWORDS = ['', 'a', 'aaaaa', '123456789', 'root@123', '@@@@@@@@@'];
  const VALID_PASSWORDS = ['Root@123'];

  INVALID_USERNAMES.forEach((username) => {
    it(`should return false for invalid username: "${username}"`, () => {
      expect(service.validateUsername(username)).toBeFalse();
    });
  });

  VALID_USERNAMES.forEach((username) => {
    it(`should return true for valid username: "${username}"`, () => {
      expect(service.validateUsername(username)).toBeTrue();
    });
  });

  INVALID_PASSWORDS.forEach((password) => {
    it(`should return false for invalid password: "${password}"`, () => {
      expect(service.validatePassword(password)).toBeFalse();
    });
  });

  VALID_PASSWORDS.forEach((password) => {
    it(`should return true for valid password: "${password}"`, () => {
      expect(service.validatePassword(password)).toBeTrue();
    });
  });

});
