import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import useTitle from "../../hooks/useTitle";
import useEffectOnce from "../../hooks/useEffectOnce";
import AddFloatingActionButton from "../../components/AddFloatingActionButton";
import IconsModal from "../../components/IconsModal";
import { useMap } from "../../contexts/Map";
import MapHandler from "./MapHanlder";
import EditingFloatingActionButton from "../../components/EditingFloatingActionButton";
import CreationModal from "../../components/CreationModal";
import { openModal } from "../../common/utils/modalControl";
import MainModal from "../../components/MainModal";

import "./style.css";

// trabalhar no tamanho das coisas no telefone
// foto dela e uma nossa nova foto do chaveiro
// ver se coloco a setinha pra passar as fotos

export default function Map() {
  useTitle("Map");

  const { setCurrentPlace, places, loadPlaces, icon, newMarker, getIcon } =
    useMap();

  const buildModal = (place) => {
    setCurrentPlace(place);
    openModal("main-staticBackdrop");
  };

  useEffectOnce(() => {
    loadPlaces();
  });

  return (
    <div id="mapPage">
      <MapContainer
        center={[-21.755444796836585, -41.3384620909276]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <MapHandler />
        <TileLayer
          url="https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=2bUB5fNNtM0pJ6eb3aWl"
          noWrap
        />
        {places.map((place) => {
          const { position } = place;
          const { file, size } = place.icon;
          return (
            position.length && (
              <Marker
                key={uuidv4()}
                position={position}
                icon={getIcon(file, size)}
                eventHandlers={{ click: () => !icon && buildModal(place) }}
              >
                <Tooltip direction="top">{place.name}</Tooltip>
              </Marker>
            )
          );
        })}
        {newMarker}
      </MapContainer>
      {icon ? <EditingFloatingActionButton /> : <AddFloatingActionButton />}
      <MainModal />
      <IconsModal />
      <CreationModal />
    </div>
  );
}
