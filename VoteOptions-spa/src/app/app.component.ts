import { Component } from '@angular/core';
import { ModalService } from './service/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sin colores';
  constructor() { }

  ngOnInit() {
  }
}
