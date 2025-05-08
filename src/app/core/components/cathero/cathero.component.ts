import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cathero',
  templateUrl: './cathero.component.html',
  styleUrls: ['./cathero.component.scss']
})

export class CatheroComponent {
  @Input() categoryId!: string;

}
