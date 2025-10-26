import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}