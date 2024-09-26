// frontend/src/components/MapComponent.jsx
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './MapComponent.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const [licensePlates, setLicensePlates] = useState([]);

  useEffect(() => {
    const fetchLicensePlates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/licenses');
        setLicensePlates(response.data);
      } catch (error) {
        console.error('Error fetching license plates:', error);
      }
    };

    fetchLicensePlates();
  }, []);

  useEffect(() => {
    const map = L.map('map').setView([13.7563, 100.5018], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    licensePlates.forEach(license => {
      L.marker([license.lat, license.long])
        .addTo(map)
        .bindPopup(`ป้ายทะเบียน: ${license.licentplateNumber}<br/>จังหวัด: ${license.licentplateProvince}`);
    });

    return () => {
      map.remove();
    };
  }, [licensePlates]);

  return (
    <div className="map-container">
      <div id="map" />
    </div>
  );
};

export default MapComponent;
