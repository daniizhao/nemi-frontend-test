import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreateServiceComponent } from './pages/create-service/create-service.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'create',
    component: CreateServiceComponent
  }
];
