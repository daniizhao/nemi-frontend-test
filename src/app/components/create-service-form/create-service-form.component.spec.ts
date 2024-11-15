import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceFormComponent } from './create-service-form.component';

describe('CreateServiceFormComponent', () => {
  let component: CreateServiceFormComponent;
  let fixture: ComponentFixture<CreateServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServiceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
