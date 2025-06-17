import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'book-list',
    loadComponent: () => import('./book-list/book-list.page').then( m => m.BookListPage)
  },
  {
    path: 'book-details/:id',
    loadComponent: () => import('./book-details/book-details.page').then( m => m.BookDetailsPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.page').then( m => m.SignUpPage)
  },
];
