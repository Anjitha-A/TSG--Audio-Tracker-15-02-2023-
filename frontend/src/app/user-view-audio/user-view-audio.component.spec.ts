import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewAudioComponent } from './user-view-audio.component';

describe('UserViewAudioComponent', () => {
  let component: UserViewAudioComponent;
  let fixture: ComponentFixture<UserViewAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewAudioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserViewAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
