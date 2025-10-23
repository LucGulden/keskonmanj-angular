import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseSearchComponent } from './reverse-search.component';

describe('ReverseSearchComponent', () => {
  let component: ReverseSearchComponent;
  let fixture: ComponentFixture<ReverseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReverseSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReverseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
