import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCountComponent } from './store-count.component';

describe('StoreCountComponent', () => {
  let component: StoreCountComponent;
  let fixture: ComponentFixture<StoreCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
