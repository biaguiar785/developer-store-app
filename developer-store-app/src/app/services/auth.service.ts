import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginResponse } from "../models/login.response";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'https://localhost:7181/api/auth';
    
    constructor(private http: HttpClient) { }

    login(credentials: { username: string; password: string }): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.success && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
            })
        );
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }
}