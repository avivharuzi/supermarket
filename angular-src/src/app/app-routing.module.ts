// Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorPageComponent } from './components/errors/error-page/error-page.component';

// Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path:  '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

const appRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class RoutingModule { }
