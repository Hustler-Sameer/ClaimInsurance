import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntimationComponentComponent } from './intimation-component.component';

describe('IntimationComponentComponent', () => {
  let component: IntimationComponentComponent;
  let fixture: ComponentFixture<IntimationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntimationComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntimationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
