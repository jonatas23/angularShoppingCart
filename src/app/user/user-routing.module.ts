import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CarrinhoComponent} from './carrinho/carrinho.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CarrinhoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
