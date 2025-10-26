import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stock-management',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss']
})
export class StockManagementComponent {}