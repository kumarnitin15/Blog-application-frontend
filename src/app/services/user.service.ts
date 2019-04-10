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

  addImage(image): Observable<any> {
    return this.http.post(`${BASEURL}/upload-image`, {image});
  }

  getProfilePic(userId): Observable<any> {
    return this.http.get(`${BASEURL}/profile-pic/${userId}`);
  }

  getNotifs(): Observable<any> {
    return this.http.get(`${BASEURL}/notifs`);
  }

  markAllNotifs(): Observable<any> {
    return this.http.post(`${BASEURL}/markAllNotifs`, {});
  }

  markNotif(index): Observable<any> {
    return this.http.post(`${BASEURL}/markNotif`, {index});  
  }

  deleteNotif(index): Observable<any> {
    return this.http.post(`${BASEURL}/deleteNotif`, {index});
  }

  deleteAllNotifs(): Observable<any> {
    return this.http.post(`${BASEURL}/deleteAllNotifs`, {});
  }

  updateProfilePic(imgSrc) {
    return this.http.post(`${BASEURL}/update-profile-pic`, {imgSrc});
  }

  addBookmark(blogId): Observable<any> {
    return this.http.post(`${BASEURL}/add-bookmark`, {blogId});
  }

  removeBookmark(index): Observable<any> {
    return this.http.post(`${BASEURL}/remove-bookmark`, {index});
  }

}
