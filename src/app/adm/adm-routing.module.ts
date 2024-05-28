import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProdutoComponent} from './produto/produto.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'produto', component: ProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
