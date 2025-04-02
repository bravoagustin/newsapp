import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  { path: 'news/:id', component: DetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];