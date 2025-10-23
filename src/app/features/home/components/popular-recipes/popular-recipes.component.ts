import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../../../../shared/components/recipe-card/recipe-card.component';
import { Recipe } from '../../../../shared/models/recipe.model';

@Component({
  selector: 'app-popular-recipes',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './popular-recipes.component.html',
  styleUrls: ['./popular-recipes.component.scss']
})
export class PopularRecipesComponent {
  currentIndex = 0;

  recipes: Recipe[] = [
    {
      id: '1',
      title: 'Pasta alla Puttanesca',
      description: 'Un plat italien savoureux avec tomates, olives et anchois',
      imageUrl: 'images/recipes/pasta.png',
      prepTime: 30,
      servings: 4,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Saumon grillé aux légumes',
      description: 'Fait sain et équilibré, parfait pour un repas léger',
      imageUrl: 'images/recipes/fish.png',
      prepTime: 25,
      servings: 2,
      rating: 4.6
    },
    {
      id: '3',
      title: 'Gâteau au chocolat',
      description: 'Dessert fondant et gourmand pour les amateurs de chocolat Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl: 'images/recipes/cake.png',
      prepTime: 45,
      servings: 8,
      rating: 4.9
    },
    {
      id: '4',
      title: 'Risotto aux champignons',
      description: 'Plat crémeux et réconfortant aux cèpes et parmesan',
      imageUrl: 'images/recipes/pasta.png',
      prepTime: 35,
      servings: 4,
      rating: 4.7
    },
    {
      id: '5',
      title: 'Poulet rôti aux herbes',
      description: 'Classique savoureux avec une peau croustillante dorée',
      imageUrl: 'images/recipes/fish.png',
      prepTime: 90,
      servings: 6,
      rating: 4.8
    },
    {
      id: '6',
      title: 'Salade César',
      description: 'Fraîche et croquante avec sa sauce crémeuse signature',
      imageUrl: 'images/recipes/cake.png',
      prepTime: 15,
      servings: 2,
      rating: 4.5
    },
    {
      id: '7',
      title: 'Tarte Tatin',
      description: 'Dessert français aux pommes caramélisées renversé',
      imageUrl: 'images/recipes/pasta.png',
      prepTime: 60,
      servings: 8,
      rating: 4.9
    },
    {
      id: '8',
      title: 'Curry de légumes',
      description: 'Plat végétarien épicé et parfumé aux saveurs indiennes',
      imageUrl: 'images/recipes/fish.png',
      prepTime: 40,
      servings: 4,
      rating: 4.6
    }
  ];

  get visibleRecipes(): Recipe[] {
    return this.recipes.slice(this.currentIndex, this.currentIndex + 4);
  }

  get canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  get canGoForward(): boolean {
    return this.currentIndex < this.recipes.length - 4;
  }

  previousSlide(): void {
    if (this.canGoBack) {
      this.currentIndex--;
    }
  }

  nextSlide(): void {
    if (this.canGoForward) {
      this.currentIndex++;
    }
  }
}