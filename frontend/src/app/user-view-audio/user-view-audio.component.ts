import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/auth';
import { UserViewAudioService } from './user-view-audio.service';

@Component({
  selector: 'app-user-view-audio',
  templateUrl: './user-view-audio.component.html',
  styleUrls: ['./user-view-audio.component.scss'],
})
export class UserViewAudioComponent implements OnInit {
  audio: any;
  ratingTrue: Boolean = false;
  constructor(
    private _router: Router,
    private userViewService: UserViewAudioService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.userViewService.getOneAudio(id).subscribe((response: any) => {
      this.audio = response;
      if (response.rating > 0.0) {
        this.ratingTrue = true;
      }
    });
  }
  logout() {
    this.authenticationService.logout().subscribe(() => this._router.navigate(['/login'], { replaceUrl: true }));
  }
}
