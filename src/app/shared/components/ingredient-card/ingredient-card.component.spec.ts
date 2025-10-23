import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientCardComponent } from './ingredient-card.component';
import { IngredientCategory } from '../../models/ingredient.model';

describe('IngredientCardComponent', () => {
  let component: IngredientCardComponent;
  let fixture: ComponentFixture<IngredientCardComponent>;

  const mockIngredient: IngredientCategory = {
    id: '1',
    name: 'Tomate',
    icon: '🍅',
    color: '#FF6347',
    count: 5
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientCardComponent);
    component = fixture.componentInstance;

    component.ingredient = mockIngredient;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
