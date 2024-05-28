import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {Product} from '../../commons/model/product.model';
import {CommonModule, CurrencyPipe, NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {ProductService} from '../../commons/service/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ToastModule,
    TableModule,
    ButtonModule,
    ProgressBarModule,
    CurrencyPipe,
    NgIf
  ],
  providers: [CommonModule, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;


  constructor(private router: Router, private productService: ProductService) {
  }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.error = null;
    this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;
        this.loading = false;
      }, error => {
        this.error = error.message;
        this.loading = false;
      });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }

  createNewProduct() {
    this.router.navigateByUrl('/adm/produto')
  }

  index() {
    this.router.navigateByUrl('/')
  }
}
