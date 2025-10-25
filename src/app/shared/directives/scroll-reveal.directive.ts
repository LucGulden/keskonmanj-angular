import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

export type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() animationType: AnimationType = 'fade-in';
  @Input() animationDelay: number = 0;
  @Input() animationDuration: number = 0.8;
  @Input() threshold: number = 0.1;

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Ajouter les classes initiales pour cacher l'élément
    this.el.nativeElement.classList.add('scroll-reveal');
    this.el.nativeElement.classList.add(`scroll-reveal--${this.animationType}`);

    // Appliquer le délai et la durée personnalisés
    if (this.animationDelay > 0) {
      this.el.nativeElement.style.setProperty('--animation-delay', `${this.animationDelay}s`);
    }
    if (this.animationDuration !== 0.8) {
      this.el.nativeElement.style.setProperty('--animation-duration', `${this.animationDuration}s`);
    }

    // Créer l'Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // L'élément est visible, déclencher l'animation
            entry.target.classList.add('scroll-reveal--visible');

            // Optionnel : arrêter d'observer une fois que l'animation est déclenchée
            if (this.observer) {
              this.observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: this.threshold,
        rootMargin: '0px 0px -50px 0px' // Déclencher légèrement avant que l'élément soit complètement visible
      }
    );

    // Commencer à observer l'élément
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // Nettoyer l'observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
