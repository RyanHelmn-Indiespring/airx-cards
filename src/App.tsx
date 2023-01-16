import React, { useEffect, useState } from "react";
import { createDetailsWidget, IDetailsWidget } from "@livechat/agent-app-sdk";
import PlaneImage from "./images/plane.svg";
import { Loader } from "./components/Loader";
import { ChatBookingDetails } from "./models/ChatBookingDetails";
import { getFlag } from "./helpers/FlagHelper";
import { getRequirementIcon } from "./helpers/SpecialRequirementsHelper";

function App() {
  const [bookingDetails, setBookingDetails] = useState<
    ChatBookingDetails | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [widgetRef, setWidgetRef] = useState<IDetailsWidget>();

  useEffect(() => {
    async function createWidget() {
      const widget = await createDetailsWidget();
      setWidgetRef(widget);

      widget.on("customer_profile", (profile) => {
        // @ts-ignore
        const customVariables = profile.customVariables;

        if (Object.keys(customVariables).length === 0) {
          setError("No booking information supplied.");
          return;
        }

        setBookingDetails({
          flightType: customVariables.flightType.toString(),
          fromDestinationAirport:
            customVariables.fromDestinationAirport.toString(),
          fromDestinationCity: customVariables.fromDestinationCity.toString(),
          fromDestinationCountry:
            customVariables.fromDestinationCountry.toString(),
          fromPassengers: customVariables.fromPassengers.toString(),
          toDestinationAirport: customVariables.toDestinationAirport.toString(),
          toDestinationCity: customVariables.toDestinationCity.toString(),
          toDestinationCountry: customVariables.toDestinationCountry.toString(),
          departureDate: new Date(customVariables.departureDate.toString()),
          fromSpecialRequirements: customVariables.fromSpecialRequirements
            .toString()
            .split(","),
          returnDate: customVariables.returnDate
            ? new Date(customVariables.returnDate.toString())
            : undefined,
          toPassengers: customVariables.toPassengers?.toString() ?? undefined,
          name: customVariables.name.toString(),
          phoneNumber: customVariables.phoneNumber.toString(),
          emailAddress: customVariables.emailAddress.toString(),
          behalfOfSomeoneElse: customVariables.behalfOfSomeoneElse === "Yes",
          flexibleDate: customVariables.flexibleDate === "Yes",
          budget: customVariables.budget.toString(),
        });
      });
    }

    createWidget();
  }, []);

  function sendBookingInformation() {
    if (!widgetRef) {
      return;
    }

    widgetRef?.putMessage("");
  }

  const timeOptions = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  } as Intl.DateTimeFormatOptions;

  return (
    <div className="flex justify-center items-center py-10 px-2">
      <div className="max-w-[343px] flex flex-col gap-y-4">
        {!bookingDetails && !error ? (
          <Loader />
        ) : error ? (
          <span className="text-xl">{error}</span>
        ) : (
          <>
            <h1 className="text-2xl">Booking Details</h1>

            <div className="w-full">
              <div className="bg-black w-full rounded-tl-[20px] rounded-tr-[20px] h-5"></div>
              <div className="bg-light-grey py-6 px-4 flex flex-col gap-y-6 rounded-bl-[20px] rounded-br-[20px]">
                <div className="flex justify-between items-center">
                  <span className="uppercase">Departure</span>
                  <span className="uppercase">Arrival</span>
                </div>

                <div className="flex justify-between items-center relative">
                  <div>
                    <div className="w-[48px]">
                      {getFlag(bookingDetails?.fromDestinationCountry!)}
                    </div>
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
                    {bookingDetails?.toDestinationCountry && (
                      <div className="w-[48px] ml-auto">
                        {getFlag(bookingDetails?.toDestinationCountry)}
                      </div>
                    )}
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

                <div className="flex items-center gap-x-2 overflow-x-auto pb-2 h-[60px]">
                  <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                    <span className="uppercase text-sm text-white">{`${bookingDetails?.fromPassengers} Pax`}</span>
                  </div>

                  {bookingDetails?.fromSpecialRequirements && (
                    <>
                      {bookingDetails.fromSpecialRequirements.map(
                        (requirement) => (
                          <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                            {getRequirementIcon(requirement)}
                            <span className="uppercase text-sm text-white">
                              {requirement}
                            </span>
                          </div>
                        ),
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {bookingDetails?.flightType === "return" && (
              <div className="w-full">
                <div className="bg-black w-full rounded-tl-[20px] rounded-tr-[20px] h-5"></div>
                <div className="bg-light-grey py-6 px-4 flex flex-col gap-y-6 rounded-bl-[20px] rounded-br-[20px]">
                  <div className="flex justify-between items-center">
                    <span className="uppercase">Departure</span>
                    <span className="uppercase">Arrival</span>
                  </div>

                  <div className="flex justify-between items-center relative">
                    <div>
                      <div className="w-[48px]">
                        {getFlag(bookingDetails.toDestinationCountry)}
                      </div>
                      <span className="uppercase text-2xl">
                        {bookingDetails.toDestinationAirport}
                      </span>
                      <span className="uppercase opacity-30">
                        {bookingDetails.toDestinationCity}
                      </span>
                    </div>

                    <div className="absolute flex justify-center w-full">
                      <img alt="Plane" src={PlaneImage} />
                    </div>

                    <div>
                      <div className="w-[48px] ml-auto">
                        {getFlag(bookingDetails.fromDestinationCountry)}
                      </div>
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

                  <div className="flex items-center gap-x-2 overflow-x-auto pb-2 h-[60px]">
                    <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                      <span className="uppercase text-sm text-white">{`${bookingDetails.toPassengers} Pax`}</span>
                    </div>

                    {bookingDetails?.fromSpecialRequirements && (
                      <>
                        {bookingDetails.fromSpecialRequirements.map(
                          (requirement) => (
                            <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                              {getRequirementIcon(requirement)}
                              <span className="uppercase text-sm text-white">
                                {requirement}
                              </span>
                            </div>
                          ),
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl">Personal Details</h2>
              <div className="space-y-3 mt-3">
                <div>
                  <span className="text-lg">Name:</span>
                  <span>{bookingDetails?.name}</span>
                </div>

                <div>
                  <span className="text-lg">Phone Number:</span>
                  <span>{bookingDetails?.phoneNumber}</span>
                </div>

                <div>
                  <span className="text-lg">Email Address:</span>
                  <span>{bookingDetails?.emailAddress}</span>
                </div>

                <div>
                  <span className="text-lg">Behalf of someone else:</span>
                  <span>
                    {bookingDetails?.behalfOfSomeoneElse ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl">Flight Details</h2>
              <div className="space-y-2 mt-3">
                <div>
                  <span className="text-lg">Flexible Date:</span>
                  <span>{bookingDetails?.flexibleDate ? "Yes" : "No"}</span>
                </div>

                <div>
                  <span className="text-lg">Budget:</span>
                  <span>{bookingDetails?.budget}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={sendBookingInformation}
                className="w-full rounded-[100px] border-2 border-black py-3 text-center italic hover:bg-black hover:text-white transition-colors"
              >
                Send Booking Information
              </button>

              <span className="text-sm text-center mt-2">
                The booking information will be copied into the live chat
                window.
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
