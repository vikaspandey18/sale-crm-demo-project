import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTellecallerModelComponent } from './history-tellecaller-model.component';

describe('HistoryTellecallerModelComponent', () => {
  let component: HistoryTellecallerModelComponent;
  let fixture: ComponentFixture<HistoryTellecallerModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTellecallerModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTellecallerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
