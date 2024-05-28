import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CommonModule, CurrencyPipe, NgIf} from '@angular/common';
import {ProgressBarModule} from 'primeng/progressbar';
import {MessageService, SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {Product} from '../../commons/model/product.model';
import {ProductService} from '../../commons/service/product.service';
import {Router} from '@angular/router';
import {CarrinhoService} from '../../commons/service/carrinho.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CurrencyPipe,
    NgIf,
    ProgressBarModule,
    SharedModule,
    TableModule,
    ToastModule,
    TooltipModule
  ],
  providers: [CommonModule, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  cartId: number = 1; // assume a cartId for simplicity

  constructor(private productService: ProductService,
              private router: Router,
              private cartService: CarrinhoService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.loading = true;
    this.error = null;
    this.cartService.findCarrinho().subscribe(data => {
      this.cartId = data.id;
      this.getProducts();
    }, error => {
      this.error = error.error.message;
      this.loading = false;
    });
  }

  getProducts() {
    this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;
        this.loading = false;
      }, error => {
        this.error = error.message;
        this.loading = false;
      });
  }

  addToCart(productId: number): void {
    this.cartService.addItemToCarrinho(this.cartId, productId, 1).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'success', detail: 'Product added to cart'});

        console.log('Product added to cart');
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message});
      }
    );
  }

  carrinho() {
    this.router.navigateByUrl('user/cart')
  }

  index() {
    this.router.navigateByUrl('/')
  }
}
