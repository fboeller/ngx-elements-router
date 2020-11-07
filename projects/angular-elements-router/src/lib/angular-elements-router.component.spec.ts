import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularElementsRouterComponent } from './angular-elements-router.component';

describe('AngularElementsRouterComponent', () => {
  let component: AngularElementsRouterComponent;
  let fixture: ComponentFixture<AngularElementsRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularElementsRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularElementsRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
