import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { NewsFormComponent } from '../news-form/news-form.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private newsService: NewsService, private dialog: MatDialog) {
  }
    openNewsForm(): void {
      this.dialog.open(NewsFormComponent, {
        width: '600px',
        maxWidth: '95vw'})
    }
  }