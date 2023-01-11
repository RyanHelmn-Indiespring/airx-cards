import React, { useEffect, useState } from "react";
import { createDetailsWidget } from "@livechat/agent-app-sdk";
import PlaneImage from "./images/plane.svg";
import WheelchairImage from "./images/wheelchair.svg";
import { Loader } from "./components/Loader";
import { ChatBookingDetails } from "./models/ChatBookingDetails";

function App() {
  const [bookingDetails, setBookingDetails] = useState<
    ChatBookingDetails | undefined
  >();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function createWidget() {
      const widget = await createDetailsWidget();

      widget.on("customer_profile", (profile) => {
        // @ts-ignore
        const customVariables = profile.customVariables;

        setBookingDetails({
          flightType: customVariables.flightType,
          fromDestinationAirport: customVariables.fromDestinationAirport,
          fromDestinationCity: customVariables.fromDestinationCity,
          fromPassengers: customVariables.fromPassengers,
          toDestinationAirport: customVariables.toDestinationAirport,
          toDestinationCity: customVariables.toDestinationCity,
          departureDate: new Date(customVariables.departureDate),
          fromSpecialRequirements: customVariables.fromSpecialRequirements,
          returnDate: customVariables.returnDate
            ? new Date(customVariables.returnDate)
            : undefined,
          toPassengers: customVariables.toPassengers ?? undefined,
        });
      });
    }

    createWidget();
  }, []);

  const timeOptions = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  } as Intl.DateTimeFormatOptions;

  return (
    <div className="flex flex-col gap-y-4 justify-center items-center py-10 px-2">
      {!bookingDetails && !error ? (
        <Loader />
      ) : error ? (
        <span className="text-xl">{error}</span>
      ) : (
        <>
          <div className="max-w-[343px] w-full">
            <div className="bg-black w-full rounded-tl-[20px] rounded-tr-[20px] h-5"></div>
            <div className="bg-light-grey py-6 px-4 flex flex-col gap-y-6 rounded-bl-[20px] rounded-br-[20px]">
              <div className="flex justify-between items-center">
                <span className="uppercase">Departure</span>
                <span className="uppercase">Arrival</span>
              </div>

              <div className="flex justify-between items-center relative">
                <div>
                  <span className="uppercase text-2xl">
                    {bookingDetails?.fromDestinationAirport}
                  </span>
                  <span className="uppercase opacity-30">
                    {bookingDetails?.fromDestinationCity}
                  </span>
                </div>

                <div className="absolute flex justify-center w-full">
                  <img alt="Plane" src={PlaneImage} className="" />
                </div>

                <div>
                  <span className="uppercase text-2xl text-right">
                    {bookingDetails?.toDestinationAirport}
                  </span>
                  <span className="uppercase opacity-30 text-right">
                    {bookingDetails?.toDestinationCity}
                  </span>
                </div>
              </div>

              <div>
                <span className="uppercase text-xs">Departs At</span>
                <span className="uppercase text-lg">
                  {bookingDetails?.departureDate?.toLocaleTimeString(
                    "default",
                    timeOptions,
                  )}
                </span>
                <span className="uppercase opacity-30">
                  {bookingDetails?.departureDate.toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-x-2 overflow-x-auto pb-3">
                <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                  <span className="uppercase text-sm text-white">{`${bookingDetails?.fromPassengers} Pax`}</span>
                </div>

                <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                  <img src={WheelchairImage} alt="Wheelchair" />
                  <span className="uppercase text-sm text-white">
                    Step-Free
                  </span>
                </div>
              </div>
            </div>
          </div>

          {bookingDetails?.flightType === "return" && (
            <div className="max-w-[343px] w-full">
              <div className="bg-black w-full rounded-tl-[20px] rounded-tr-[20px] h-5"></div>
              <div className="bg-light-grey py-6 px-4 flex flex-col gap-y-6 rounded-bl-[20px] rounded-br-[20px]">
                <div className="flex justify-between items-center">
                  <span className="uppercase">Departure</span>
                  <span className="uppercase">Arrival</span>
                </div>

                <div className="flex justify-between items-center relative">
                  <div>
                    <span className="uppercase text-2xl">
                      {bookingDetails.toDestinationAirport}
                    </span>
                    <span className="uppercase opacity-30">
                      {bookingDetails.toDestinationCity}
                    </span>
                  </div>

                  <div className="absolute flex justify-center w-full">
                    <img alt="Plane" src={PlaneImage} className="" />
                  </div>

                  <div>
                    <span className="uppercase text-2xl text-right">
                      {bookingDetails.fromDestinationAirport}
                    </span>
                    <span className="uppercase opacity-30 text-right">
                      {bookingDetails.fromDestinationCity}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="uppercase text-xs">Departs At</span>
                  <span className="uppercase text-lg">
                    {bookingDetails.returnDate?.toLocaleTimeString(
                      "default",
                      timeOptions,
                    )}
                  </span>
                  <span className="uppercase opacity-30">
                    {bookingDetails.returnDate?.toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-x-2 overflow-x-auto pb-3">
                  <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                    <span className="uppercase text-sm text-white">{`${bookingDetails.toPassengers} Pax`}</span>
                  </div>

                  <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                    <img src={WheelchairImage} alt="Wheelchair" />
                    <span className="uppercase text-sm text-white">
                      Step-Free
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
