import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {}