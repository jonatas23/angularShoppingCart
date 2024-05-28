import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../commons/service/product.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Product} from '../../commons/model/product.model';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [
    InputNumberModule,
    ButtonModule,
    ToastModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  providers: [CommonModule, MessageService],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      quantidade: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productService.addProduct(product).subscribe(
        () => {
          this.retornar();
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: error});
        }
      );
    }
  }

  retornar() {
    this.router.navigateByUrl('/adm');
  }
}
