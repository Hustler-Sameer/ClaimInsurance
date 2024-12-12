import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthClaimIntimationComponent } from './health-claim-intimation.component';

describe('HealthClaimIntimationComponent', () => {
  let component: HealthClaimIntimationComponent;
  let fixture: ComponentFixture<HealthClaimIntimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthClaimIntimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthClaimIntimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
