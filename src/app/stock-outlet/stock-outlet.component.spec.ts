import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOutletComponent } from './stock-outlet.component';

describe('StockOutletComponent', () => {
  let component: StockOutletComponent;
  let fixture: ComponentFixture<StockOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
