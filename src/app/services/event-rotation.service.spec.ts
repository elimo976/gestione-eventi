import { TestBed } from '@angular/core/testing';

import { EventRotationService } from './event-rotation.service';

describe('EventRotationService', () => {
  let service: EventRotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventRotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
