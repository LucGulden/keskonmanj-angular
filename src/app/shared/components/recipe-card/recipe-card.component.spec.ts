import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardComponent } from './recipe-card.component';
import { Recipe } from '../../models/recipe.model';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  const mockRecipe: Recipe = {
    id: '1',
    title: 'Pasta alla Puttanesca',
    description: 'Un plat italien savoureux avec tomates, olives et anchois',
    imageUrl: 'images/recipes/pasta.png',
    prepTime: 30,
    servings: 4,
    rating: 4.8
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;

    component.recipe = mockRecipe;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
