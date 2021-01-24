import { TestBed, async, inject } from '@angular/core/testing';

import { EskaGuardGuard } from './eska-guard.guard';

describe('EskaGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EskaGuardGuard]
    });
  });

  it('should ...', inject([EskaGuardGuard], (guard: EskaGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
