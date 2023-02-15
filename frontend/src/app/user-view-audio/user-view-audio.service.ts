import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserViewAudioService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getOneAudio(id: any): Observable<any> {
    console.log('query', id);
    return this.http.get(`/audio/${id}`, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
}
