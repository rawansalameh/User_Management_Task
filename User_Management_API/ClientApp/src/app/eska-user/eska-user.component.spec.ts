import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EskaUserComponent } from './eska-user.component';

describe('EskaUserComponent', () => {
  let component: EskaUserComponent;
  let fixture: ComponentFixture<EskaUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EskaUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EskaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
