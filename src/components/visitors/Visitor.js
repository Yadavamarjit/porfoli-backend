import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../context/UserProvider";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import mapIcon from "./icon.png";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import "./Visitor.css";

export default function Visitor() {
  const { visitors } = useUserContext();
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    // Handle zooming to the selected visitor when it changes
    if (selectedVisitor && mapRef.current) {
      const { latitude, longitude } = selectedVisitor;
      mapRef.current.setView([latitude, longitude], 10, { animate: true });
    }
  }, [selectedVisitor]);

  const icon = new Icon({
    iconUrl: mapIcon,
    iconSize: [40, 40],
  });

  // Handler for table row click
  const handleTableRowClick = (visitor) => {
    setSelectedVisitor(visitor);
  };

  // Custom map component to access the map instance
  const CustomMap = () => {
    const map = useMap();
    mapRef.current = map; // Set the map instance to the ref
    return null; // Render nothing, as we don't need a separate map component
  };

  // Calculate total number of visitors
  const totalVisitors = visitors.length;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side: Map */}
      <div style={{ flex: "1" }}>
        <MapContainer
          center={[28.4098, 77.31]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CustomMap />
          {visitors.map(
            (data) =>
              data?.latitude &&
              data?.longitude && (
                <Marker
                  position={[data.latitude, data.longitude]}
                  icon={icon}
                  key={data._id}
                >
                  <Popup>{data.city}</Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </div>

      {/* Right side: Visitor data table */}
      <div
        style={{
          flex: "1",
          padding: "20px",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        {/* Summary Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Summary</h3>
          <p>Total Number of Visitors: {totalVisitors}</p>
        </div>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Country Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Latitude - Longitude</TableCell>
                <TableCell>Longitude</TableCell>
                {/* Add more columns based on your model */}
              </TableRow>
            </TableHead>
            <TableBody>
              {visitors.map((data) => (
                <TableRow
                  className="visitor-col"
                  key={data._id}
                  onClick={() => handleTableRowClick(data)}
                >
                  <TableCell>{data.country_name}</TableCell>
                  <TableCell>{data.city}</TableCell>
                  <TableCell>{data.latitude}</TableCell>
                  <TableCell>{data.longitude}</TableCell>
                  {/* Add more cells based on your model */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
