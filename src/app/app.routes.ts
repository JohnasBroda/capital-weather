import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: 'forecast-list',
        loadComponent: () =>
            import('./pages/forecast-list/forecast-list.component').then(
                (m) => m.ForecastListComponent
            )
    },
    {
        path: 'forecast-details',
        loadComponent: () =>
            import('./pages/forecast-details/forecast-details.component').then(
                (m) => m.ForecastDetailsComponent
            )
    }
];
