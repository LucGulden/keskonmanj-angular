import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientCardComponent } from '../../../../shared/components/ingredient-card/ingredient-card.component';
import { IngredientCategory } from '../../../../shared/models/ingredient.model';

@Component({
  selector: 'app-reverse-search',
  standalone: true,
  imports: [CommonModule, IngredientCardComponent],
  templateUrl: './reverse-search.component.html',
  styleUrls: ['./reverse-search.component.scss']
})
export class ReverseSearchComponent {
  ingredients: IngredientCategory[] = [
    { 
      id: '1', 
      name: $localize`:@@ingredient.vegetables:Légumes`, 
      icon: '🥕', 
      count: 12, 
      color: '#F97316' 
    },
    { 
      id: '2', 
      name: $localize`:@@ingredient.meat:Viandes`, 
      icon: '🥩', 
      count: 8, 
      color: '#EF4444' 
    },
    { 
      id: '3', 
      name: $localize`:@@ingredient.fish:Poissons`, 
      icon: '🐟', 
      count: 5, 
      color: '#3B82F6' 
    },
    { 
      id: '4', 
      name: $localize`:@@ingredient.dairy:Produits laitiers`, 
      icon: '🧀', 
      count: 6, 
      color: '#EAB308' 
    }
  ];

  trackByIngredientId(index: number, ingredient: IngredientCategory): string {
    return ingredient.id;
  }
}