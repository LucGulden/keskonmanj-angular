import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './cta-section.component.html',
  styleUrls: ['./cta-section.component.scss']
})
export class CtaSectionComponent {}