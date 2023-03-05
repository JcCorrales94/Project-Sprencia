import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/users'
  }

  register(formValue: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, formValue, httpOptions)
    )
  }

  login(formValue: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formValue, httpOptions)
    )
  }
}
