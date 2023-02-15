import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

export interface EditContext {
  title: string;
  artist: string;
  category_id: string;
  album: string;
  // remember?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EditService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getOneAudio(id: any): Observable<any> {
    console.log('query', id);
    return this.http.get(`/audio/${id}`, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }

  getCategory(): Observable<any> {
    return this.http.get('/category', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }

  updateAudio(trackid: any, reqObj: EditContext): Observable<any> {
    return this.http.put(`/audio/${trackid}`, reqObj, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
  getAudioList(): Observable<any> {
    return this.http.get('/audio', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }

  // deleteAudio(trackid:any):Observable<any> {
  //   console.log("trackid :", trackid)
  //   return this.http.delete(`/audio/${trackid}`,{headers:{"Authorization": `Bearer ${this.credentialService.credentials}`}})
  // }
}
