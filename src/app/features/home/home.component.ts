import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ReverseSearchComponent } from './components/reverse-search/reverse-search.component';
import { PopularRecipesComponent } from './components/popular-recipes/popular-recipes.component';
import { StockManagementComponent } from './components/stock-management/stock-management.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    ReverseSearchComponent,
    PopularRecipesComponent,
    StockManagementComponent,
    CtaSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}