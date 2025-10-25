import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives';

@Component({
  selector: 'app-stock-management',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss']
})
export class StockManagementComponent {}