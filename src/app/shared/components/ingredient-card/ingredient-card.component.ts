import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IngredientCategory } from '../../models/ingredient.model';

@Component({
  selector: 'app-ingredient-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss']
})
export class IngredientCardComponent {
  @Input() ingredient!: IngredientCategory;
}