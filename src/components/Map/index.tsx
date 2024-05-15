import React, { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import * as L from "leaflet"
import "leaflet.awesome-markers/dist/leaflet.awesome-markers"

declare module "leaflet" {
    interface AwesomeMarkers {
        Icon: any
        icon: any
    }

    const AwesomeMarkers: AwesomeMarkers
}

L.AwesomeMarkers.Icon.prototype.options.prefix = "fa"

export const MarkerIcon = L.AwesomeMarkers.icon({
    icon: "home",
    markerColor: "orange",
    className: "awesome-marker",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
})

interface MapProps {
    center: [number, number]
    zoom?: number
    markerText?: string
    width?: string
    height?: string
    isView?: boolean
}

const Map: React.FC<MapProps> = ({
    center,
    zoom = 15,
    markerText = "This is your selected location",
    isView = false,
    width = "100%",
    height = "200px"
}) => {
    const CenteredMap = () => {
        const map = useMap()
        map.invalidateSize()

        useEffect(() => {
            map.flyTo(center)
        }, [center, map])

        return null
    }

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ width, height }}
            scrollWheelZoom={false}
            dragging={!isView}
            tap={!isView}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center} icon={MarkerIcon}>
                <Popup>{markerText}</Popup>
            </Marker>
            <CenteredMap />
        </MapContainer>
    )
}

export default Map
