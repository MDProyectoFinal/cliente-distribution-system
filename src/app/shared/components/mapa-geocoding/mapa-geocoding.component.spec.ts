import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaGeocodingComponent } from './mapa-geocoding.component';

describe('MapaGeocodingComponent', () => {
  let component: MapaGeocodingComponent;
  let fixture: ComponentFixture<MapaGeocodingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapaGeocodingComponent]
    });
    fixture = TestBed.createComponent(MapaGeocodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
