import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingMessageComponent } from './shopping-message.component';

describe('ShoppingMessageComponent', () => {
  let component: ShoppingMessageComponent;
  let fixture: ComponentFixture<ShoppingMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
