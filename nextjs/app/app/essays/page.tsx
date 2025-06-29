import React from "react";

export default function Page() {
  return (
    // Main container for centering and padding (Bootstrap classes)
    <div className="container py-4 bg-light d-flex flex-column align-items-center">
      {/* Container for the cards with responsive grid layout (Bootstrap classes) */}
      <div className="row w-100 justify-content-center">
        {/* Card 1: Essay Analysis */}
        {/* col-12 for full width on small screens, col-md-4 for 3 columns on medium screens and up */}
        <div className="col-12 col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0 rounded-lg"> {/* h-100 ensures equal height */}
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title h3 text-dark mb-2">Essay Analysis</h5> {/* h3 for slightly larger title */}
                <p className="card-text text-muted mb-4">
                  Analyze your essays for structure, content, and coherence with AI insights.
                </p>
              </div>
              <a
                href="/app/essays/analysis"
                className="btn btn-primary btn-lg mt-auto" // mt-auto pushes button to bottom
              >
                Go to Analysis
              </a>
            </div>
          </div>
        </div>

        {/* Card 2: Brainstorming */}
        <div className="col-12 col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0 rounded-lg">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title h3 text-dark mb-2">Brainstorming</h5>
                <p className="card-text text-muted mb-4">
                  Generate creative ideas, outlines, and prompts to kickstart your writing process.
                </p>
              </div>
              <a
                href="/app/essays/brainstorming"
                className="btn btn-success btn-lg mt-auto" // Using btn-success for green
              >
                Go to Brainstorming
              </a>
            </div>
          </div>
        </div>

        {/* Card 3: Editing */}
        <div className="col-12 col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0 rounded-lg">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title h3 text-dark mb-2">Editing</h5>
                <p className="card-text text-muted mb-4">
                  Refine your essays with AI-powered suggestions for grammar, style, and clarity.
                </p>
              </div>
              <a
                href="/app/essays/editing"
                className="btn btn-info btn-lg mt-auto" // Using btn-info for a different color (purple-ish in some themes)
              >
                Go to Editing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
