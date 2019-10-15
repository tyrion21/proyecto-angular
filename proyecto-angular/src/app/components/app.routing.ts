import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateComponent } from './create/create.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
    {path: '',component: AboutComponent},
    {path: 'sobre-mi',component: AboutComponent},
    {path: 'proyectos',component: ProjectsComponent},
    {path: 'crear-proyecto',component: CreateComponent},
    {path: 'contacto',component: ContactComponent},
    {path: '**',component: ErrorComponent},    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

