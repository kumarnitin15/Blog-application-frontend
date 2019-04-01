import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/blogapp';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserBlogs(userId): Observable<any> {
    return this.http.get(`${BASEURL}/blogs/${userId}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/users`);
  }

  getUser(userId): Observable<any> {
    return this.http.get(`${BASEURL}/user/${userId}`);
  }

  followUser(userId): Observable<any> {
    return this.http.post(`${BASEURL}/follow-user`, {userId});
  }

  unfollowUser(userId): Observable<any> {
    return this.http.post(`${BASEURL}/unfollow-user`, {userId});
  }
}
