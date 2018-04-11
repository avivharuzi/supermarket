import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCountItemComponent } from './store-count-item.component';

describe('StoreCountItemComponent', () => {
  let component: StoreCountItemComponent;
  let fixture: ComponentFixture<StoreCountItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCountItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCountItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
