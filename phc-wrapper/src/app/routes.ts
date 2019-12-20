import { LoginGuard } from './_guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { FlowersManagementComponent } from './components/flowers-management/flowers-management.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
        canActivate: [LoginGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard]
    },
    {
        path: 'about',
        component: AboutComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard]
    },
    {
        path: 'users-management',
        component: UsersManagementComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'flowers-management',
        component: FlowersManagementComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard]
    },
    {
         path: '**',
         redirectTo: 'login',
         pathMatch: 'full',
         canActivate: [LoginGuard]
    }
];
