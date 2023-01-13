import React, { ReactElement } from "react";

import { ReactComponent as CoffinIconLight } from "../assets/icons/coffin-light.svg";
import { ReactComponent as CargoIconLight } from "../assets/icons/package-light.svg";
import { ReactComponent as PawIconLight } from "../assets/icons/paw-light.svg";
import { ReactComponent as OtherIconLight } from "../assets/icons/questionmark-light.svg";
import { ReactComponent as WheelChairIconLight } from "../assets/icons/wheelchair-light.svg";

export function getRequirementIcon(
  requirement: string,
): ReactElement | undefined {
  switch (requirement.toLowerCase()) {
    case "wheel chair":
      return <WheelChairIconLight width={14} height={14} />;
    case "cargo":
      return <CargoIconLight width={14} height={14} />;
    case "pet":
      return <PawIconLight width={14} height={14} />;
    case "coffin":
      return <CoffinIconLight width={14} height={14} />;
    case "other":
      return <OtherIconLight width={14} height={14} />;
    default:
      return undefined;
  }
}
