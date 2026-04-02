import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTellecallerModelComponent } from './detail-tellecaller-model.component';

describe('DetailTellecallerModelComponent', () => {
  let component: DetailTellecallerModelComponent;
  let fixture: ComponentFixture<DetailTellecallerModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTellecallerModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTellecallerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
