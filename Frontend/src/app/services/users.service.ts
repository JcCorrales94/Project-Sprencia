import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/users/'
  }

  login(formValue: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.httpClient.post<any>(this.baseUrl + 'login', formValue, httpOptions)
  }
}