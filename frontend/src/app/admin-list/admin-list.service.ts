import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CredentialsService } from '@app/auth';
// import { AuthenticationService } from './auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminListService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getAudioList(): Observable<any> {
    return this.http.get('/audio', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
  deleteAudio(trackid: any): Observable<any> {
    console.log('trackid :', trackid);
    return this.http.delete(`/audio/${trackid}`, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
}
