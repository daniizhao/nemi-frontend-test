export default interface Service {
  id: number,
  name: string,
  area: string,
  client: string,
  duration: Date,
  active: boolean,
  centerLocation: {
    lat: number,
    lng: number
  }
}
