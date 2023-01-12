import React, { ReactElement } from "react";

import { ReactComponent as BRSvg } from "../assets/icons/countries/br.svg";
import { ReactComponent as CNSvg } from "../assets/icons/countries/cn.svg";
import { ReactComponent as DESvg } from "../assets/icons/countries/de.svg";
import { ReactComponent as ESPSvg } from "../assets/icons/countries/esp.svg";
import { ReactComponent as FRSvg } from "../assets/icons/countries/fr.svg";
import { ReactComponent as INDSvg } from "../assets/icons/countries/ind.svg";
import { ReactComponent as JPSvg } from "../assets/icons/countries/jp.svg";
import { ReactComponent as KRSvg } from "../assets/icons/countries/kr.svg";
import { ReactComponent as MEXSvg } from "../assets/icons/countries/mex.svg";
import { ReactComponent as RUSvg } from "../assets/icons/countries/ru.svg";
import { ReactComponent as UAESvg } from "../assets/icons/countries/uae.svg";
import { ReactComponent as UKSvg } from "../assets/icons/countries/uk.svg";
import { ReactComponent as USSvg } from "../assets/icons/countries/us.svg";

export function getFlag(country: string): ReactElement | undefined {
  switch (country.toLowerCase()) {
    case "gb":
      return <UKSvg />;
    case "us":
      return <USSvg />;
    case "de":
      return <DESvg />;
    case "jp":
      return <JPSvg />;
    case "br":
      return <BRSvg />;
    case "kr":
      return <KRSvg />;
    case "cn":
      return <CNSvg />;
    case "fr":
      return <FRSvg />;
    case "ae":
      return <UAESvg />;
    case "esp":
      return <ESPSvg />;
    case "in":
      return <INDSvg />;
    case "mx":
      return <MEXSvg />;
    case "ru":
      return <RUSvg />;
    default:
      return undefined;
  }
}
