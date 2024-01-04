import React, {useEffect, useRef} from "react";
import "./AdminPage.css";
import { Viewer } from "@grapecity/activereports-react";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";

const AdminPage = () => {
  const viewerRef = useRef(null);
  const viewerUri = "../report.rdlx-json"
  function onPreview(){
    viewerRef.current.Viewer.open(viewerUri, {
      ReportParams: [
        {
          Name: "start",
          Value: ["2023-11-11"],
        },
        {
          Name: "end",
          Value: ["2023-12-30"],
        },
        {
          Name: "token",
          // ${localStorage.getItem('token')}
          Value: ["Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNzAzNTIwMDM0fQ.BFGw6h7CMLksMCCeinHw_r9PGJ22YI3NQ4zypSmkVbQ"],
        },
      ],
    })
  }

  useEffect(()=>{
    onPreview();
  }, [])

  return (
    <div id="viewer-host">
      <Viewer ref={viewerRef} />
    </div>
  );
}

export default AdminPage;