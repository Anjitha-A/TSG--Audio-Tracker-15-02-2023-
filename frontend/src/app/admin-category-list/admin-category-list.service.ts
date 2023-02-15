import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminCategoryListService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getCategorylist(): Observable<any> {
    return this.http.get('/category', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
}
