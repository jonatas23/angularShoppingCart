import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CommonModule, CurrencyPipe, NgFor, NgIf} from '@angular/common';
import {ProgressBarModule} from 'primeng/progressbar';
import {MessageService, SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {Carrinho} from '../../commons/model/cart.model';
import {CarrinhoService} from '../../commons/service/carrinho.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CurrencyPipe,
    NgIf,
    NgFor,
    ProgressBarModule,
    SharedModule,
    TableModule,
    ToastModule,
    TooltipModule
  ],
  providers: [CommonModule, MessageService],  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent implements OnInit {

  cart: Carrinho | undefined;
  cartId: number = 1; // assume a cartId for simplicity

  loading: boolean = false;
  error: string | null = null;
  constructor(private cartService: CarrinhoService,
              private messageService: MessageService,
              private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.cartService.findCarrinho().subscribe(data => {
      this.cart = data;
      this.cartId = this.cart.id;
      this.loading = false;
    }, error => {
      this.error = error.error.message;
      this.loading = false;
    });
  }

  removeItem(itemId: number): void {
    if (this.cart) {
      this.cartService.removeItemFromCarrinho(this.cart.id, itemId).subscribe(cart => {
        this.cart = cart;
      });
    }
  }

  finalizeCart(): void {
    if (this.cart) {
      this.cartService.finalizeCarrinho(this.cart.id).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'success', detail: 'Cart finalized'});
        setTimeout(() => {
          this.retornar();
        }, 2000);
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Fail Cart finalized'});
      });
    }
  }

  retornar(){
    this.router.navigateByUrl('user');
  }
}
