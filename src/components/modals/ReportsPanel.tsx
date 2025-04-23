'use client';

import { useModeration } from '@/hooks/useModeration';
import { formatDate } from '@/lib/utils/date';

export default function ReportsPanel() {
  const { reports, dismissReport, deleteReportedPost, isModerator } = useModeration();

  if (!isModerator) return null;

  return (
    <div className="reports-panel">
      <h2>
        Moderator Panel 
        <button onClick={() => document.getElementById('reportsPanel')?.style.display = 'none'}>
          <i className="fas fa-times"></i>
        </button>
      </h2>
      
      {reports.length === 0 ? (
        <p>No reports to review</p>
      ) : (
        reports.map((report) => (
          <div key={report.id} className="report-item">
            <h4>Reported Post #{report.postId}</h4>
            <p>{report.reason}</p>
            <small>Reported on {formatDate(report.date)}</small>
            <div className="report-actions">
              <button 
                className="report-dismiss"
                onClick={() => dismissReport(report.id!)}
              >
                Dismiss
              </button>
              <button 
                className="report-delete"
                onClick={() => deleteReportedPost(report.id!)}
              >
                Delete Post
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}