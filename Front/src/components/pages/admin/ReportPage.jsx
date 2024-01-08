import React, {useEffect, useRef} from "react";
import "./AdminPage.css";
import { Viewer } from "@grapecity/activereports-react";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";

const ReportPage = () => {
  const viewerRef = useRef(null);
  const viewerUri = "../report.rdlx-json"
  const curDate = new Date().toJSON().substring(0, 10)
  function onPreview(){
    viewerRef.current.Viewer.open(viewerUri, {
      ReportParams: [
        {
          Name: "start",
          Value: curDate,
        },
        {
          Name: "end",
          Value: curDate,
        },
        {
          Name: "token",
          Value: localStorage.getItem('token'),
        },
      ],
    })
  }

  useEffect(()=>{
    onPreview();
  }, [])


  return (
    <div id="viewer-host">
      <Viewer ref={viewerRef} sidebarVisible={true} panelsLayout={'sidebar'}/>
    </div>
  );
}

export default ReportPage;