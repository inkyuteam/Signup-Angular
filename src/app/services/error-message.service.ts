import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errorMessagesUrl = 'assets/error-messages.json';

  constructor(private http: HttpClient) {}

  getErrorMessages(): Observable<any> {
    return this.http.get<any>(this.errorMessagesUrl);
  }
}
