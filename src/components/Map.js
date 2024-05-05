import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
// import "./Map.css";

function Map({ places }) {
  const markers = places
    .filter(
      (obj) => obj.location && obj.location.latitude && obj.location.longitude
    )
    .map((obj) => {
      return {
        popup: obj.name,
        geocode: [obj.location.latitude, obj.location.longitude],
      };
    });

  const customIcon = new Icon({
    iconUrl: require("../assets/google-maps.png"),
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[1.39027, 103.751959]}
        zoom={11.5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker) => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>
                <h2>{marker.popup}</h2>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default Map;
