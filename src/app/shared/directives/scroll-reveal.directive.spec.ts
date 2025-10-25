import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ScrollRevealDirective } from './scroll-reveal.directive';

@Component({
  template: `
    <div appScrollReveal
         [animationType]="animationType"
         [animationDelay]="animationDelay"
         [animationDuration]="animationDuration"
         [threshold]="threshold">
    </div>
  `,
  standalone: true,
  imports: [ScrollRevealDirective]
})
class TestHostComponent {
  animationType = 'slide-up';
  animationDelay = 0.5;
  animationDuration = 1.2;
  threshold = 0.2;
}

// Mock d’IntersectionObserver accessible dans tous les tests
class MockIntersectionObserver {
  static lastInstance: MockIntersectionObserver | null = null;

  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  observed: Element[] = [];
  disconnected = false;

  constructor(cb: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = cb;
    this.options = options;
    MockIntersectionObserver.lastInstance = this;
  }

  observe(target: Element) {
    this.observed.push(target);
  }

  unobserve(target: Element) {
    this.observed = this.observed.filter(t => t !== target);
  }

  disconnect() {
    this.disconnected = true;
  }
}

describe('ScrollRevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let element: HTMLElement;

  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(async () => {
    // Sauvegarde du vrai IntersectionObserver
    originalIntersectionObserver = (window as any).IntersectionObserver;

    // Remplacer le vrai IntersectionObserver par le mock
    (window as any).IntersectionObserver = MockIntersectionObserver as any;

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('div');
  });

  afterEach(() => {
    // Restaurer le vrai IntersectionObserver
    (window as any).IntersectionObserver = originalIntersectionObserver;
    MockIntersectionObserver.lastInstance = null;
  });

  it('should create the host component', () => {
    expect(component).toBeTruthy();
  });

  it('should add base classes on init', () => {
    expect(element.classList.contains('scroll-reveal')).toBeTrue();
    expect(element.classList.contains('scroll-reveal--slide-up')).toBeTrue();
  });

  it('should apply custom delay and duration styles', () => {
    const delay = element.style.getPropertyValue('--animation-delay');
    const duration = element.style.getPropertyValue('--animation-duration');
    expect(delay).toBe('0.5s');
    expect(duration).toBe('1.2s');
  });

  it('should start observing the element', () => {
    const mockObserverInstance = MockIntersectionObserver.lastInstance;
    expect(mockObserverInstance?.observed).toContain(element);
  });

  it('should add visible class when entry is intersecting', () => {
    const mockObserverInstance = MockIntersectionObserver.lastInstance;
    const entry: Partial<IntersectionObserverEntry> = {
      isIntersecting: true,
      target: element
    };

    // Appeler la callback avec le mock casté en any pour TS
    (mockObserverInstance?.callback as any)(
      [entry as IntersectionObserverEntry],
      mockObserverInstance as any
    );

    expect(element.classList.contains('scroll-reveal--visible')).toBeTrue();
  });

  it('should disconnect observer on destroy', () => {
    const directive = fixture.debugElement.children[0].injector.get(ScrollRevealDirective) as any;
    const mockObserverInstance = MockIntersectionObserver.lastInstance;

    const spy = spyOn(mockObserverInstance as any, 'disconnect').and.callThrough();
    directive.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
    expect(mockObserverInstance?.disconnected).toBeTrue();
  });
});
