import React, { FC, useEffect, useState } from "react";
import { InputLabel } from "@material-ui/core";

//Create a default prop interface for, Type and isRequired(?)
interface SPpplPickerProps {
  pPrincipalAccountType?: string;
  pSearchPrincipalSource?: number;
  pResolvePrincipalSource?: number;
  pAllowMultipleValues?: boolean;
  pMaximumEntitySuggestions?: number;
  pWidth?: string;
  pDivId?: string;
  pLabel?: string;
}

//Add the required JS files from SharePoint, needed for People Picker to render.
const GetPPScriptFiles: any = (filename: any) => {
  const scriptEle = document.createElement("script");
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("src", "http://localhost:8081/_layouts/15/" + filename);
  document.getElementsByTagName("head")[0].appendChild(scriptEle);
};

//People Picker Component
const SPpplPicker: FC<SPpplPickerProps> = ({
  pPrincipalAccountType = "User,DL,SecGroup,SPGroup",
  pSearchPrincipalSource = 15,
  pResolvePrincipalSource = 15,
  pAllowMultipleValues = false,
  pMaximumEntitySuggestions = 50,
  pWidth = "745px",
  pDivId = "",
  pLabel = ""
}) => {
  /*Set State*/
  const [timeoutSeconds, settimeoutSeconds] = useState(1000); //<-- Development timeout is default(500 mili seconds)

  /* Run on page load*/
  useEffect(() => {
    GetPPScriptFiles("clienttemplates.js");
    GetPPScriptFiles("clientforms.js");
    GetPPScriptFiles("clientpeoplepicker.js");
    GetPPScriptFiles("autofill.js");
    //@ts-ignore
    ExecuteOrDelayUntilScriptLoaded(function() {
      initializePeoplePicker(pDivId);
    }, "sp.core.js");

    //@ts-ignore  //!test if SharePoint variable exists, if it does, its production
    let _spPageContextInfo = window._spPageContextInfo;

    //Equation to set the timeout in seconds based on environment(Development, Production)
    if (_spPageContextInfo !== undefined) {
      settimeoutSeconds(0);
      console.log(timeoutSeconds, "0 = production");
    } else {
      console.log(timeoutSeconds, "1000 = Development");
    }
  }, []);
  /*Initialize People Picker with Properties*/
  const initializePeoplePicker: any = function(this: any, eleId: any) {
    const schema: object = {
      PrincipalAccountType: pPrincipalAccountType,
      SearchPrincipalSource: pSearchPrincipalSource,
      ResolvePrincipalSource: pResolvePrincipalSource,
      AllowMultipleValues: pAllowMultipleValues,
      MaximumEntitySuggestions: pMaximumEntitySuggestions,
      Width: pWidth,
      titleText: "test",
      showtooltip: true
    };
    //Timeout needed for development to work.  If this is production timeoutSeconds will equal 0
    setTimeout(function() {
      //@ts-ignore //!ignore for SharePoint loading purposes
      SPClientPeoplePicker_InitStandaloneControlWrapper(eleId, null, schema);
    }, timeoutSeconds);
  };

  return (
    <div className="SPpplPicker">
      <InputLabel children={pLabel} />
      <div id={pDivId}></div>
    </div>
  );
};

export default SPpplPicker;
