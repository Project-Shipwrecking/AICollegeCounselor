import React from "react";

export default async function Page() {
  return (
    <section className="container mx-auto py-4 rounded bg-white shadow-md mb-3">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/admin/common-data-set-database/approver" className="no-underline">
            <button className="w-full p-4 bg-blue-600 hover:bg-blue-700rounded shadow transition-colors">
              Review College Data Submissions
            </button>
          </a>
          {/* Add more admin tools/buttons here as needed */}
        </div>
      </div>
    </section>
  );
}
