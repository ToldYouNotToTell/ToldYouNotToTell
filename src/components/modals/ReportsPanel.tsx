"use client";

import React from "react";

import { ReactIcon } from "@/components/ui/icons/ReactIcon";
import { useModeration, Report } from "@/hooks/useModeration";
import { formatDate } from "@/lib/utils/date";

export default function ReportsPanel() {
  const { reports, dismissReport, deleteReportedPost, isModerator } =
    useModeration();

  if (!isModerator) return null;

  return (
    <div id="reportsPanel" className="reports-panel">
      <h2 className="reports-panel__header">
        Moderator Panel
        <button
          className="reports-panel__close"
          onClick={() => {
            const el = document.getElementById("reportsPanel");
            if (el) el.style.display = "none";
          }}
          aria-label="Close reports panel"
          title="Close"
        >
          <ReactIcon name="times" prefix="fas" />
        </button>
      </h2>

      {reports.length === 0 ? (
        <p>No reports to review</p>
      ) : (
        reports.map((report: Report) => (
          <div key={report.id} className="report-item">
            <h4>Post #{report.postId} reported</h4>
            <p>Reason: {report.reason}</p>
            <p>By: {report.reporter}</p>
            <p>Date: {formatDate(report.createdAt)}</p>
            <div className="report-actions">
              <button
                onClick={() => dismissReport(report.id)}
                aria-label="Dismiss report"
                title="Dismiss"
              >
                <ReactIcon name="ban" prefix="fas" /> Dismiss
              </button>
              <button
                onClick={() => deleteReportedPost(report.id, report.postId)}
                aria-label="Delete reported post"
                title="Delete Post"
              >
                <ReactIcon name="trash" prefix="fas" /> Delete Post
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
