import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdManagerUserComponent } from './ad-manager-user.component';

describe('AdManagerUserComponent', () => {
  let component: AdManagerUserComponent;
  let fixture: ComponentFixture<AdManagerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdManagerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdManagerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
