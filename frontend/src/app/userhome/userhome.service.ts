import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

export interface SearchContext {
  search_value: string;
  // remember?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserhomeService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getAudios(): Observable<any> {
    return this.http.get('/audio', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
  searchAudio(reqObj: SearchContext): Observable<any> {
    return this.http.post('/search', reqObj, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
}
