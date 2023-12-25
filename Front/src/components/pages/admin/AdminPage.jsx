import React from "react";
import "./AdminPage.css";
import { Viewer } from "@grapecity/activereports-react";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";

function AdminPage() {
//   const viewerRef = React.useRef(null);

  
//   function onPreview(){

//     // console.log(dateStart.toISOString())
    
//     viewerRef.current.Viewer.open("../reportLogs.rdlx-json", {
//       ReportParams: [
//         {
//           Name: "date_start",
//           Value: ["2023-11-11"],
//         },
//         {
//           Name: "date_finish",
//           Value: ["2023-12-12"],
//         },
//         {
//           Name: "token",
//           Value: ["Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNzAzNTIwMDM0fQ.BFGw6h7CMLksMCCeinHw_r9PGJ22YI3NQ4zypSmkVbQ"],
//         },
//       ],
//     })
//   }

//   React.useEffect(()=>{
//     onPreview();
//   }, [])

const parameters = [
            {
              Name: "date_start",
              Value: "2023-11-11",
            },
            {
              Name: "date_finish",
              Value: "2023-12-12",
            },
            {
              Name: "token",
              Value: ["Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNzAzNTIwMDM0fQ.BFGw6h7CMLksMCCeinHw_r9PGJ22YI3NQ4zypSmkVbQ"],
            },
          ]
         console.log( parameters[0].Value, parameters[0].Name);

  return (
    
    <div id="viewer-host">
        <Viewer report={{ Uri: "../report.rdlx-json"}} sidebarVisible={true} />
      {/* <Viewer report={{ Uri: 'reportLogs.rdlx-json' }} /> */}
      {/* <Viewer ref={viewerRef} /> */}
    </div>
  );
}

export default AdminPage;