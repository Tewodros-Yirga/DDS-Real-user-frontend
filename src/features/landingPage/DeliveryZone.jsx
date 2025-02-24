import Section from "../../design/section";
import Heading from "../../design/Heading";
import { useEffect, useState } from "react";
import DeliveryZonesMap from "../../design/DeliveryZoneMap";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  useGetDeliveryZonesQuery,
  selectAllDeliveryZones,
} from "./deliveryZonesApiSlice";
import { useSelector } from "react-redux";

const DeliveryZone = () => {
  const {
    data: zones,
    isLoading,
    isError,
    error,
  } = useGetDeliveryZonesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [mapCenter, setMapCenter] = useState({
    lat: 9.035837172515716,
    lng: 38.752291674100675,
  }); // Default center
  const [activePlace, setActivePlace] = useState(null);

  const deliveryZones = useSelector(selectAllDeliveryZones);

  useEffect(() => {
    if (zones?.ids.length > 0) {
      const firstZone = zones.entities[zones.ids[0]];
      if (firstZone?.coordinates) {
        setMapCenter(firstZone.coordinates);
        setActivePlace(firstZone.id);
      }
    }
  }, [zones]);

  const handlePlaceClick = (coordinates, id) => {
    if (coordinates?.lat && coordinates?.lng) {
      setMapCenter(coordinates);
      setActivePlace(id);
    } else {
      console.warn("Invalid coordinates for zone:", id);
    }
  };

  const centers = deliveryZones.map((zone) => ({
    coordinates: zone.coordinates,
    radius: zone.radius || 0, // Fallback to 0 if radius is undefined
    id: zone.id,
    zoneName: zone.zoneName,
  }));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Section
      className="z-1 h-full py-[10.5rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings="md:px-[3rem] sm:px-[1rem] px-[0.5rem]"
      id="DeliveryMap"
    >
      <Heading
        title="Delivery Zone Areas"
        tag="Order - Prepare - Deliver"
        text="These are the areas we are opened right now, and we are expanding every year."
      />
      <div className="mb-10 flex w-full justify-center">
        <div className="m-2 flex w-[75%] flex-row justify-evenly overflow-x-auto">
          {centers.map((zone) => (
            <button
              key={zone.id}
              onClick={() => handlePlaceClick(zone.coordinates, zone.id)}
              className={`whitespace-nowrap px-3 hover:text-color-1 ${
                zone.id === activePlace ? "text-color-1" : "text-n-1"
              }`}
            >
              <div className="flex justify-center">
                <FaMapMarkerAlt />
              </div>
              {zone.zoneName}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-6 justify-center lg:container lg:mx-auto lg:w-[85%]">
        <DeliveryZonesMap centers={centers} mapCenter={mapCenter} />
      </div>
    </Section>
  );
};
export default DeliveryZone;
