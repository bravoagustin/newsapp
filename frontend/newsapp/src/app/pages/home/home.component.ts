import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data, RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { NewsCardComponent } from '../../Components/news-card/news-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    NewsCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  news: News[] = [];
  loading = false;
  error: string | null = null;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;
    this.newsService.getAllNews().subscribe({
      next: (data) => {
        this.news = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las noticias';
        this.loading = false;
        console.error('Error fetching news:', err);
      }
    });
  } 
}
