import { TestBed } from '@angular/core/testing';

import { ResultadoGestionService } from './resultado-gestion.service';

describe('ResultadoGestionService', () => {
  let service: ResultadoGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
