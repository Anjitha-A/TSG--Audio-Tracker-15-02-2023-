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
export class SearchService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}

  searchAudio(search_value: SearchContext): Observable<any> {
    return this.http.post('/search', search_value, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
}
