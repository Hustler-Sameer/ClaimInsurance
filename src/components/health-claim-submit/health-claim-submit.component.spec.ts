import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthClaimSubmitComponent } from './health-claim-submit.component';

describe('HealthClaimSubmitComponent', () => {
  let component: HealthClaimSubmitComponent;
  let fixture: ComponentFixture<HealthClaimSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthClaimSubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthClaimSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
