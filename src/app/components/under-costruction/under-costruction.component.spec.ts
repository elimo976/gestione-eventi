import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderCostructionComponent } from './under-costruction.component';

describe('UnderCostructionComponent', () => {
  let component: UnderCostructionComponent;
  let fixture: ComponentFixture<UnderCostructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnderCostructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderCostructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
