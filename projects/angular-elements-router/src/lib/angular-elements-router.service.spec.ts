import { TestBed } from '@angular/core/testing';

import { AngularElementsRouterService } from './angular-elements-router.service';

describe('AngularElementsRouterService', () => {
  let service: AngularElementsRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularElementsRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
