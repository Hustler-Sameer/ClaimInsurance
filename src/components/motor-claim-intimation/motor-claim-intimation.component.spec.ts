import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorClaimIntimationComponent } from './motor-claim-intimation.component';

describe('MotorClaimIntimationComponent', () => {
  let component: MotorClaimIntimationComponent;
  let fixture: ComponentFixture<MotorClaimIntimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorClaimIntimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorClaimIntimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
