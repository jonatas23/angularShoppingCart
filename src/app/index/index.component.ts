import { Component } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  constructor(private router: Router) {
  }

  adm() {
    this.router.navigateByUrl('adm')
  }

  user() {
    this.router.navigateByUrl('user')
  }
}
