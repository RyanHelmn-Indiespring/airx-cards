import React, { useEffect, useState } from "react";
import { createDetailsWidget } from "@livechat/agent-app-sdk";
import PlaneImage from "./images/plane.svg";
import WheelchairImage from "./images/wheelchair.svg";
import { Loader } from "./components/Loader";

function App() {
  const [profile, setProfile] = useState<{} | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function createWidget() {
      const widget = await createDetailsWidget();

      widget.on("customer_profile", (profile) => {
        setProfile(profile);
        console.log(profile);
      });
    }

    createWidget();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 justify-center items-center py-10 px-2">
      {!profile && !error ? (
        <Loader />
      ) : error ? (
        <span className="text-xl">{error}</span>
      ) : (
        <>
          {" "}
          <div className="max-w-[343px] w-full">
            <div className="bg-black w-full rounded-tl-[20px] rounded-tr-[20px] h-5"></div>
            <div className="bg-light-grey py-6 px-4 flex flex-col gap-y-6 rounded-bl-[20px] rounded-br-[20px]">
              <div className="flex justify-between items-center">
                <span className="uppercase">Departure</span>
                <span className="uppercase">Arrival</span>
              </div>

              <div className="flex justify-between items-center relative">
                <div>
                  <span className="uppercase text-2xl">LHR</span>
                  <span className="uppercase opacity-30">London</span>
                </div>

                <div className="absolute flex justify-center w-full">
                  <img alt="Plane" src={PlaneImage} className="" />
                </div>

                <div>
                  <span className="uppercase text-2xl text-right">PAR</span>
                  <span className="uppercase opacity-30 text-right">Paris</span>
                </div>
              </div>

              <div>
                <span className="uppercase text-xs">Departs At</span>
                <span className="uppercase text-lg">09:00</span>
                <span className="uppercase opacity-30">20/08/2021</span>
              </div>

              <div className="flex items-center gap-x-2 overflow-x-auto pb-3">
                <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                  <span className="uppercase text-sm text-white">2 Pax</span>
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
          <div className="max-w-[343px] w-full">
            <div className="bg-black w-full rounded-tl-[20px] rounded-tr-[20px] h-5"></div>
            <div className="bg-light-grey py-6 px-4 flex flex-col gap-y-6 rounded-bl-[20px] rounded-br-[20px]">
              <div className="flex justify-between items-center">
                <span className="uppercase">Departure</span>
                <span className="uppercase">Arrival</span>
              </div>

              <div className="flex justify-between items-center relative">
                <div>
                  <span className="uppercase text-2xl">PAR</span>
                  <span className="uppercase opacity-30">Paris</span>
                </div>

                <div className="absolute flex justify-center w-full">
                  <img alt="Plane" src={PlaneImage} className="" />
                </div>

                <div>
                  <span className="uppercase text-2xl text-right">LHR</span>
                  <span className="uppercase opacity-30 text-right">
                    London
                  </span>
                </div>
              </div>

              <div>
                <span className="uppercase text-xs">Departs At</span>
                <span className="uppercase text-lg">12:00</span>
                <span className="uppercase opacity-30">27/08/2021</span>
              </div>

              <div className="flex items-center gap-x-2 overflow-x-auto pb-3">
                <div className="bg-black px-2.5 py-1.5 rounded-[69px] flex-shrink-0 flex items-center gap-x-2">
                  <span className="uppercase text-sm text-white">2 Pax</span>
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
        </>
      )}
    </div>
  );
}

export default App;
