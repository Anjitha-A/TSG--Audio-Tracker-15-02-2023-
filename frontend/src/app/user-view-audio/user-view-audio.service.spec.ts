import { TestBed } from '@angular/core/testing';

import { UserViewAudioService } from './user-view-audio.service';

describe('UserViewAudioService', () => {
  let service: UserViewAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserViewAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
