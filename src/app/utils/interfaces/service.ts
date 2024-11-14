import { MapMarkerInfo } from "./mapMarker";

export default interface Service {
  id: number,
  name: string,
  area: string,
  client: string,
  duration: string,
  active: boolean,
  lat: number,
  lng: number,
  freePoints?: MapMarkerInfo[]
}
