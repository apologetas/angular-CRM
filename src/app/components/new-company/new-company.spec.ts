import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompany } from './new-company';

describe('NewCompany', () => {
  let component: NewCompany;
  let fixture: ComponentFixture<NewCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCompany);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
