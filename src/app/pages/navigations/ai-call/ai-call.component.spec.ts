import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCallComponent } from './ai-call.component';

describe('AiCallComponent', () => {
  let component: AiCallComponent;
  let fixture: ComponentFixture<AiCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
