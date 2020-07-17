import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailChildComponent } from './stock-detail-child.component';

describe('StockDetailChildComponent', () => {
  let component: StockDetailChildComponent;
  let fixture: ComponentFixture<StockDetailChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDetailChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
