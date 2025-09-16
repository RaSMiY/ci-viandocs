import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/view', pathMatch: 'full' },
    {
        path: 'view',
        loadChildren: () => import('./modules/view-annotate/view-annotate.module').then(m => m.ViewAnnotateModule)
    }
];
