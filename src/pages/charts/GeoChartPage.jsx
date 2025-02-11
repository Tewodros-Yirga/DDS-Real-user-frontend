import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// The URL or path to the GeoJSON file (example for world map)
const geoUrl = "https://raw.githubusercontent.com/d3/d3-geo/master/test/data/world-110m2.json";


const GeoChartPage = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Geography Chart - Delivery Areas</h2>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#D6D6D6"
                stroke="#FFFFFF"
                style={{
                  default: { outline: 'none' },
                  hover: { fill: "#FF5733", transition: 'all 250ms', outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default GeoChartPage;
