import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const FieldToCopy = ({
  title,
  valueToShow,
  valueToCopy,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(valueToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Box
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {" "}
      {valueToShow}{" "}
      {showTooltip && (
        <Box
          style={{
            position: "absolute",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            padding: "5px",
            borderRadius: "4px",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <span style={{ marginRight: "8px" }}>
          {title &&  <p > {title}: </p>}
            {valueToCopy}
          </span>{" "}
          <IconButton
            onClick={handleCopyToClipboard}
            size="small"
            style={{ marginLeft: "auto" }}
          >
            {" "}
            {copied ? (
              <CheckIcon fontSize="small" style={{ color: "green" }} />
            ) : (
              <ContentCopyIcon fontSize="small" />
            )}{" "}
          </IconButton>{" "}
        </Box>
      )}{" "}
    </Box>
  );
};
export default FieldToCopy;
