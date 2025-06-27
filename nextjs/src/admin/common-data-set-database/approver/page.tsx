"use client";

import React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


// Helper to check admin status
async function checkAdmin() {
  const res = await fetch("/api/admin");
  return await res.json();
}

// Fetch pending submissions (replace with your actual API endpoint)
async function fetchPending() {
  const res = await fetch("/api/admin/college-database/cds/pending");
  return await res.json();
}

// Approve or reject a submission
async function handleAction(id: string, action: "approve" | "reject") {
  await fetch(`/api/admin/college-database/cds/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}

export default function Page() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin().then(setIsAdmin);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchPending().then((data) => {
        setPending(data || []);
        setLoading(false);
      });
    }
  }, [isAdmin]);

  if (isAdmin === null) return <div>Checking admin status...</div>;
  if (!isAdmin) return <div>Access denied. Admins only.</div>;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "acceptanceRate", headerName: "Acceptance Rate", width: 120 },
    { field: "applicationType", headerName: "Application Type", width: 120, valueGetter: (v, row) => (row.applicationType || []).join(", ") },
    { field: "testPolicy", headerName: "Test Policy", width: 120 },
    { field: "gpa", headerName: "GPA (25/50/75)", width: 120, valueGetter: (v, row) => row.gpa ? `${row.gpa[25]}/${row.gpa[50]}/${row.gpa[75]}` : "" },
    { field: "sat", headerName: "SAT (25/50/75)", width: 120, valueGetter: (v, row) => row.sat ? `${row.sat[25]}/${row.sat[50]}/${row.sat[75]}` : "" },
    { field: "act", headerName: "ACT (25/50/75)", width: 120, valueGetter: (v, row) => row.act ? `${row.act[25]}/${row.act[50]}/${row.act[75]}` : "" },
    { field: "lor", headerName: "LOR", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Button
            color="success"
            size="small"
            onClick={async () => {
              await handleAction(params.row.id, "approve");
              setPending((prev) => prev.filter((item) => item.id !== params.row.id));
            }}
            sx={{ mr: 1 }}
          >
            Approve
          </Button>
          <Button
            color="error"
            size="small"
            onClick={async () => {
              await handleAction(params.row.id, "reject");
              setPending((prev) => prev.filter((item) => item.id !== params.row.id));
            }}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Pending College Data Submissions</h1>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={pending}
          loading={loading}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
        />
      </Paper>
    </section>
  );
}
