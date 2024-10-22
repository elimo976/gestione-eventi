import { TestBed } from '@angular/core/testing';

import { SearchEventsService } from './search-events.service';

describe('SearchEventsService', () => {
  let service: SearchEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
