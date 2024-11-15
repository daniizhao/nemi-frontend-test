import { CommonModule } from '@angular/common';
import { AfterViewInit, booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { BCN_COORDS } from '../../utils/constants';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { BUTTON_STYLES } from '../../utils/enum/button-styles';
import { MapMarkerInfo } from '../../utils/interfaces/mapMarker';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    RouterModule,
    MatDialogModule,
    TranslateModule,
    InputComponent,
    ButtonComponent
],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  googleMap: google.maps.Map;
  infoWindow: google.maps.InfoWindow;

  @Input() center: google.maps.LatLngLiteral = BCN_COORDS
  zoom: number = 13;
  @Input() set markers(value: MapMarkerInfo[]) {
    this._markers = value;
  }
  @Input({transform: booleanAttribute}) editable: boolean = false;

  @Output() onMarkerAdded: EventEmitter<any> = new EventEmitter();

  buttonStyles = BUTTON_STYLES;

  emptyMarkerInfo = {
    lat: 0,
    lng: 0,
    name: ''
  };
  newMarker: MapMarkerInfo = this.emptyMarkerInfo;
  _markers: MapMarkerInfo[] = [];

  headerHTML: HTMLElement | string = '';
  contentHTML: HTMLElement | string = '';

  constructor() {}

  ngAfterViewInit(): void {
    this.headerHTML = document.getElementById('markerFormTitle') ?? '';
    this.contentHTML = document.getElementById('markerFormContent') ?? '';
  }

  onMapInitialized(map: google.maps.Map) {
    this.googleMap = map;
    this.infoWindow = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(0, -40)
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng && this.editable) {
      this.openInfoWindow(
        this.headerHTML,
        this.contentHTML,
        event.latLng
      );
      this.newMarker = {
        ...this.newMarker,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }

    }
  }

  onMarkerClick(event: google.maps.MapMouseEvent) {
    let marker = this._markers.find(m => m.lat === event.latLng?.lat() && m.lng === event.latLng.lng());
    if (marker) {
      this.openInfoWindow(
        marker?.name,
        '',
        event.latLng
      );
    }
  }

  openInfoWindow(headerHTML: HTMLElement | string, contentHTML: HTMLElement | string, coords: google.maps.LatLng | null) {
    this.infoWindow.setHeaderContent(headerHTML);
    this.infoWindow.setContent(contentHTML);
    this.infoWindow.setPosition(coords);
    this.infoWindow.open(this.googleMap);
  }

  onInputChange(value: string) {
    this.newMarker.name = value;
  }

  onCreateNewMarker() {
    this._markers.push(this.newMarker);
    this.onMarkerAdded.emit(this.newMarker);
    this.newMarker = this.emptyMarkerInfo;
    this.infoWindow.close();
  }

  onCancelCreateNewMarker() {
    this.newMarker = this.emptyMarkerInfo;
    this.infoWindow.close();
  }

}
