import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimMisComponent } from './claim-mis.component';

describe('ClaimMisComponent', () => {
  let component: ClaimMisComponent;
  let fixture: ComponentFixture<ClaimMisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimMisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
