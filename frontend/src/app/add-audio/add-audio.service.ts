import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

export interface AddContext {
  title: string;
  artist: string;
  category_id: string;
  album: string;
  // remember?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AddAudioService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getCategory(): Observable<any> {
    return this.http.get('/category', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
  addAudio(requestObj: AddContext): Observable<any> {
    return this.http.post('/audio', requestObj, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
}
