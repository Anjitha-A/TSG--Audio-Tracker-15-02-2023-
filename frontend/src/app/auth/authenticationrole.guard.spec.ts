import { TestBed } from '@angular/core/testing';

import { AuthenticationroleGuard } from './authenticationrole.guard';

describe('AuthenticationroleGuard', () => {
  let guard: AuthenticationroleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationroleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
