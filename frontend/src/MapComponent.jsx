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

  // ดึงข้อมูลป้ายทะเบียนล่าสุด
  useEffect(() => {
    const fetchLatestLicensePlates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/licenses/latest');
        setLicensePlates(response.data);
      } catch (error) {
        console.error('Error fetching latest license plates:', error);
      }
    };

    fetchLatestLicensePlates();
  }, []);

  useEffect(() => {
    const map = L.map('map').setView([13.7563, 100.5018], 10); // ตำแหน่งเริ่มต้นที่กรุงเทพฯ

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    // เพิ่ม marker สำหรับแต่ละป้ายทะเบียน
    licensePlates.forEach(license => {
      const lat = parseFloat(license.lat);
      const long = parseFloat(license.long);

      if (!isNaN(lat) && !isNaN(long)) {
        console.log(`Adding marker at: ${lat}, ${long}`); // เพิ่ม log เพื่อดูค่าที่เพิ่ม
        L.marker([lat, long])
          .addTo(map)
          .bindPopup(`ป้ายทะเบียน: ${license.licentplateNumber}<br/>จังหวัด: ${license.licentplateProvince}`);
      }
    });

    return () => {
      map.remove();
    };
  }, [licensePlates]);

  return (
    <div className="map-container">
      <div id="map" style={{ height: '500px' }} />
    </div>
  );
};

export default MapComponent;
