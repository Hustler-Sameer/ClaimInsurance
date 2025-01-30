import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOuterComponentComponent } from './main-outer-component.component';

describe('MainOuterComponentComponent', () => {
  let component: MainOuterComponentComponent;
  let fixture: ComponentFixture<MainOuterComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOuterComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOuterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
