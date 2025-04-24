import { useState } from "react";
import { FaCopy, FaDownload } from "react-icons/fa";

export default function RecoveryModal({
  code,
  onClose,
  onDownload,
}: {
  code: string;
  onClose: () => void;
  onDownload: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="recovery-code-modal">
      <h2>
        Save this code - it's your key to stories
        <div className="info-tooltip">
          <i className="fas fa-info-circle"></i>
          <span className="tooltip-text">
            If you clear your browser cache or access from another device, this
            code will restore access to your anonymous posts. Write it down or
            save it in a safe place!
          </span>
        </div>
      </h2>
      <div className="recovery-code">
        <span>{code}</span>
        <button className="copy-code" onClick={copyCode} title="Copy code">
          <FaCopy />
          {copied && <span className="copied-tooltip">Copied!</span>}
        </button>
      </div>
      <div className="form-actions">
        <button type="button" onClick={onDownload}>
          <FaDownload /> Download
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
