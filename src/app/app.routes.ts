import {Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';

export const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    data: { animation: 'index' }
  },
  { path: 'adm', loadChildren: () => import('./adm/adm.module').then(module => module.AdmModule)},
  { path: 'user', loadChildren: () => import('./user/user.module').then(module => module.UserModule)},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
];
