import { TestBed } from '@angular/core/testing';

import { AddAudioService } from './add-audio.service';

describe('AddAudioService', () => {
  let service: AddAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
