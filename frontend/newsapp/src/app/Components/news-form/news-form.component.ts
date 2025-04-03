import { Component, Inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { news?: News; isEdit: boolean },
    private newsService: NewsService,
    private snackBar: MatSnackBar
  ) {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', Validators.required],
      author: ['', Validators.required],
      image_url: ['', Validators.pattern('https?://.+')],
    });
  }

  ngOnInit(): void {
    if (this.data?.isEdit && this.data.news) {
      this.newsForm.patchValue({
        title: this.data.news.title,
        content: this.data.news.content,
        author: this.data.news.author,
        image_url: this.data.news.image_url,
      });
    }
  }

  onSubmit() {
    if (this.newsForm.invalid) return;
  
    this.loading = true;
    
    this.newsService.createNews(this.newsForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Noticia guardada exitosamente', 'Cerrar', { duration: 3000 });
        this.loading = false;
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error al guardar la noticia', error);
        this.loading = false;
        this.snackBar.open('Hubo un error al guardar la noticia', 'Cerrar', { duration: 3000 });
      }
    });
  }

  private handleSuccess(result: any, message: string): void {
    this.loading = false;
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.dialogRef.close(result);
  }
}
