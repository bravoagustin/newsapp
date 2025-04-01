import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: News | null,
    private newsService: NewsService
  ) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      content: [''],
      author: ['', Validators.required],
      image_url: ['']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.newsForm.patchValue({
        title: this.data.title,
        content: this.data.content,
        author: this.data.author,
        image_url: this.data.image_url,
      });
    }
  }

  onSubmit() {
    if (this.newsForm.valid) {
      this.loading = true;
      const newsData = this.newsForm.value;
      
      if (this.data) {
        this.newsService.updateNews(this.data.title, newsData).subscribe({
          next: (updatedNews) => {
            this.loading = false;
            this.dialogRef.close(updatedNews);
          },
          error: (err) => {
            this.loading = false;
            this.error = 'Error al actualizar la noticia';
            console.error('Error updating news:', err);
          }
        });
      } else {
        this.newsService.createNews(newsData).subscribe({
          next: (newNews) => {
            this.loading = false;
            this.dialogRef.close(newNews);
          },
          error: (err) => {
            this.loading = false;
            this.error = 'Error al crear la noticia';
            console.error('Error creating news:', err);
          }
        });
      }
    }
  }
}