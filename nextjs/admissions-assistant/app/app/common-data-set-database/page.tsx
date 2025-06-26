"use client";

import React from "react";

import {
  dropTargetForExternal,
  monitorForExternal,
} from "@atlaskit/pragmatic-drag-and-drop/external/adapter";

import DataTable from 'datatables.net-dt';

export default function Page() {
  "use client";
  const [dragActive, setDragActive] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const dropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!dropRef.current) return;
    const dropTarget = dropTargetForExternal({
      element: dropRef.current,
      onDrop({ source }) {
        if (source.items && source.items.length > 0) {
          const file = source.items[0].getAsFile();
          if (file && file.type === "text/csv") {
            setFileName(file.name);
            alert(`CSV file "${file.name}" ready for processing.`);
          } else {
            alert("Please drop a valid CSV file.");
          }
        }
        setDragActive(false);
      },
      onDragEnter() {
        setDragActive(true);
      },
      onDragLeave() {
        setDragActive(false);
      },
    });
    return () => dropTarget();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className={"bg-light rounded p-3"}>Common Data Set Database Interface</h1>
        <p className={"bg-light rounded p-3"}>
          The Common Data Set (CDS) is a standardized collection of data points
          and definitions used by colleges and universities to report key
          institutional information. This interface allows you to explore and
          analyze CDS data for various institutions such as admissions rates,
          average GPA, average SAT & ACT scores, and the prioritization of
          certain factors during the admissions process
        </p>

        <br/>
        <div className="mt-8 bg-light rounded p-3">
          <h2 className="text-lg font-semibold mb-2">
            Upload College CSV Data
          </h2>
          <div
            ref={dropRef}
            className={`border-dashed border-2 border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 transition-colors ${
              dragActive ? "bg-blue-100" : ""
            }`}
            tabIndex={0}
          >
            <label
              htmlFor="csv-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <span className="mb-2 text-gray-600">
                Drag and drop your CSV file here, or click to select
              </span>
              
              <div className="w-32 h-20 flex items-center justify-center border-2 border-gray-300 rounded bg-white mt-2">
                <span className="text-gray-400">
                  {fileName ? fileName : <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.type === "text/csv") {
                    setFileName(file.name);
                    alert(`CSV file "${file.name}" ready for processing.`);
                  } else {
                    alert("Please select a valid CSV file.");
                  }
                }}
              />}
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
