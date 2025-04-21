import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api.response';
import { CreateUserResponse } from '../models/create-user.response';
import { CreateUserRequest } from '../models/create-user.request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:54339/api';

  constructor(private http : HttpClient) { }

  register(data: CreateUserRequest): Observable<ApiResponse<CreateUserResponse>>{
    return this.http.post<ApiResponse<CreateUserResponse>>(`${this.apiUrl}/users`, data)
  }


}
