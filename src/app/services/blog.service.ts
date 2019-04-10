import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/blogapp';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAllBlogs(): Observable<any> {
    return this.http.get(`${BASEURL}/blogs`);
  }

  createNewBlog(topic, caption, tags, mainImage): Observable<any> {
    return this.http.post(`${BASEURL}/create-new-blog`, {
      topic,
      caption,
      tags,
      mainImage
    });
  }

  getBlogById(blogId): Observable<any> {
    return this.http.get(`${BASEURL}/blog/${blogId}`);
  }

  saveBlog(blogId, topic, caption, mainImage, content): Observable<any> {
    return this.http.post(`${BASEURL}/save-blog`, {
      blogId,
      topic,
      mainImage,
      caption,
      content
    });
  }

  addView(blogId): Observable<any> {
    return this.http.post(`${BASEURL}/add-view`, {blogId});
  }

  postBlog(blogId): Observable<any> {
    return this.http.post(`${BASEURL}/post-blog`, {blogId});
  }

  deleteBlog(blogId): Observable<any> {
    return this.http.post(`${BASEURL}/delete-blog`, {blogId});
  }

  addLike(blogId): Observable<any> {
    return this.http.post(`${BASEURL}/add-like`, {blogId});
  }

  addComment(blogId, comment): Observable<any> {
    return this.http.post(`${BASEURL}/add-comment`, {
      blogId,
      comment
    });
  }

  shareBlog(blogId): Observable<any> {
    return this.http.post(`${BASEURL}/share-blog`, {blogId});
  }

  bookmarkedBlogs(): Observable<any> {
    return this.http.get(`${BASEURL}/bookmarked-blogs`);
  }
}
