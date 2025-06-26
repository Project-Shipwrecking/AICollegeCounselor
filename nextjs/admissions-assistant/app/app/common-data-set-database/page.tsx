"use client";

import React from "react";

import { dropTargetForExternal } from "@atlaskit/pragmatic-drag-and-drop/external/adapter";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Select from "react-select";

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
        <h1 className={"bg-light rounded p-3"}>
          Common Data Set Database Interface
        </h1>
        <p className={"bg-light rounded p-3"}>
          The Common Data Set (CDS) is a standardized collection of data points
          and definitions used by colleges and universities to report key
          institutional information. This interface allows you to explore and
          analyze CDS data for various institutions such as admissions rates,
          average GPA, average SAT & ACT scores, and the prioritization of
          certain factors during the admissions process
        </p>

        <br />
        {/* Fields to have: Name, type (Liberal Arts vs Universities), Acceptance Rate, Deadlines, Whether it accepts EA, ED, RD, SCEA, Rolling, Test Policy (Blind, Option, Mandatory), GPA/ACT/SAT (25%/50%/75%), Letter of Rec) */}
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={[
              {
                field: "name",
                headerName: "Name",
                width: 70,
              },
              {
                field: "acceptanceRate",
                headerName: "Acceptance Rate",
                width: 70,
              },
              {
                field: "applicationType",
                headerName: "Application Type",
                width: 70,
              },
              {
                field: "testPolicy",
                headerName: "Test Policy",
                width: 70,
              },
              {
                field: "gpa25",
                headerName: "25%",
                width: 30,
                valueGetter: (value, row) => `${row.gpa["25"] || ""}`,
              },
              {
                field: "gpa50",
                headerName: "50%",
                width: 30,
                valueGetter: (value, row) => `${row.gpa["50"] || ""}`,
              },
              {
                field: "gpa75",
                headerName: "75%",
                width: 30,
                valueGetter: (value, row) => `${row.gpa["75"] || ""}`,
              },
              {
                field: "sat25",
                headerName: "25%",
                width: 30,
                valueGetter: (value, row) => `${row.sat["25"] || ""}`,
              },
              {
                field: "sat50",
                headerName: "50%",
                width: 30,
                valueGetter: (value, row) => `${row.sat["50"] || ""}`,
              },
              {
                field: "sat75",
                headerName: "75%",
                width: 30,
                valueGetter: (value, row) => `${row.sat["75"] || ""}`,
              },
              {
                field: "act25",
                headerName: "25%",
                width: 30,
                valueGetter: (value, row) => `${row.act["25"] || ""}`,
              },
              {
                field: "act50",
                headerName: "50%",
                width: 30,
                valueGetter: (value, row) => `${row.act["50"] || ""}`,
              },
              {
                field: "act75",
                headerName: "75%",
                width: 30,
                valueGetter: (value, row) => `${row.act["75"] || ""}`,
              },
              {
                field: "lor",
                headerName: "LOR",
                width: 30,
              },
            ]}
            rows={[
              {
                id: "uuidv4",
                name: "",
                acceptanceRate: "",
                applicationType: [],
                testPolicy: "",
                gpa: {
                  25: 25,
                  50: 50,
                  75: 75,
                },
                sat: {
                  25: 25,
                  50: 50,
                  75: 75,
                },
                act: {
                  25: 25,
                  50: 50,
                  75: 75,
                },
                lor: "",
              },
            ]}
            // initialState={{ pagination: { page: 0, pageSize: 5 } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>

        <br />

        <div className="mt-8 bg-light rounded p-3">
          <h2 className="text-lg font-semibold mb-2">
            Upload College CSV Data
          </h2>
          <p>
            If you'd like to contribute to the cause, consider uploading data of
            colleges not currently in our database!
          </p>
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
                  {fileName ? (
                    fileName
                  ) : (
                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.type === "text/csv") {
                          setFileName(file.name);
                          alert(
                            `CSV file "${file.name}" ready for processing.`
                          );
                        } else {
                          alert("Please select a valid CSV file.");
                        }
                      }}
                    />
                  )}
                </span>
              </div>
            </label>
          </div>
        </div>

        <br />

        <div className="mt-8 bg-light rounded p-3">
          <h2 className="text-lg font-semibold mb-2">
            Manually Add College Data
          </h2>
          <p>
            Enter college information manually if you don't have a CSV file.
          </p>
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Manual college data submitted (not yet implemented).");
            }}
          >
            <div className="flex gap-4 flex-wrap">
              <input
                id="year"
                type="text"
                placeholder="Year (either one year or a hyphenated school year)"
                className="border rounded p-2 flex-1 min-w-[180px]"
                required
              />
              <input
                id="name"
                type="text"
                placeholder="College Name"
                className="border rounded p-2 flex-1 min-w-[180px]"
                required
              />
              <input
                id="acceptanceRate"
                type="text"
                placeholder="Acceptance Rate (%)"
                className="border rounded p-2 flex-1 min-w-[180px]"
              />
              {/* Application Type Multi-select */}
              <div style={{ display: "inline-block", minWidth: 180 }}>
                <Select
                  inputId="applicationType"
                  isMulti
                  options={[
                    { value: "EA", label: "EA" },
                    { value: "ED", label: "ED" },
                    { value: "RD", label: "RD" },
                    { value: "Rolling", label: "Rolling" },
                    { value: "SCEA", label: "SCEA" },
                  ]}
                  // className="react-select-container"
                  // classNamePrefix="react-select"
                  placeholder="Application Type"
                  styles={{
                    container: (base) => ({
                      ...base,
                      display: "inline-block",
                      minWidth: 180,
                    }),
                  }}
                />
              </div>
              <input
                id="test-policy"
                type="text"
                placeholder="Test Policy"
                className="border rounded p-2 flex-1 min-w-[180px]"
              />
              <input
                id="gpa"
                type="text"
                placeholder="GPA 25/50/75"
                className="border rounded p-2 flex-1 min-w-[180px]"
              />
              <input
                id="sat"
                type="text"
                placeholder="SAT 25/50/75"
                className="border rounded p-2 flex-1 min-w-[180px]"
              />
              <input
                id="act"
                type="text"
                placeholder="ACT 25/50/75"
                className="border rounded p-2 flex-1 min-w-[180px]"
              />
              <input
                id="lor"
                type="text"
                placeholder="LOR"
                className="border rounded p-2 flex-1 min-w-[180px]"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-primary rounded px-4 py-2 self-start"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
