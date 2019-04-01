import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(private tokenService: TokenService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json' 
        };
        const token = this.tokenService.GetToken();
        if(token) {
            headerConfig['Authorization'] = `bearer ${token}`;
        }
        const _req = req.clone({setHeaders: headerConfig});
        return next.handle(_req);
    }
}