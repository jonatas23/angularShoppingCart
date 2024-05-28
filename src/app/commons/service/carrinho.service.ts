import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Carrinho} from '../model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl = 'http://localhost:8080/api/carts';

  constructor(private http: HttpClient) {}

  createCarrinho(): Observable<Carrinho> {
    return this.http.post<Carrinho>(this.apiUrl, {});
  }

  findCarrinho(): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.apiUrl}/`);
  }

  getCarrinho(cartId: number): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.apiUrl}/${cartId}`);
  }

  addItemToCarrinho(cartId: number, productId: number, quantity: number): Observable<Carrinho> {
    return this.http.post<Carrinho>(`${this.apiUrl}/${cartId}/items`, { productId, quantity }).pipe(
      catchError(error => {
        console.error('Ocorreu um erro ao adicionar o item ao carrinho:', error);
        return throwError(error);
      })
    );
  }

  removeItemFromCarrinho(cartId: number, itemId: number): Observable<Carrinho> {
    return this.http.delete<Carrinho>(`${this.apiUrl}/${cartId}/items/${itemId}`);
  }

  finalizeCarrinho(cartId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${cartId}/finalize`, {});
  }
}
