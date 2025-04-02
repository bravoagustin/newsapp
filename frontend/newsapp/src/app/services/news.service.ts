import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateNewsDto, News } from '../models/news.model';
import { CreateNews } from '../models/news.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = environment.apiUrl + '/news';

  constructor(private http: HttpClient) { }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  getNewsById(id: string): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${id}`);
  }

  createNews(news: CreateNewsDto): Observable<News> {
    return this.http.post<News>(this.apiUrl, news);
  }

  updateNews(id: string, news: Partial<CreateNewsDto>): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/${id}`, news);
  }

  deleteNews(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchNews(query: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/search?query=${query}`);
  }
}