import React from "react";

/**
 * Reusable anchor for external / download links.
 *
 * Props:
 *   download  – if truthy, adds the HTML download attribute.
 *               Pass a string to set the saved filename,
 *               or true to use the href filename.
 *               When download is set the link opens in the same tab.
 */
export const ExternalLink = React.memo(function ExternalLink({
  href,
  className = "",
  "aria-label": ariaLabel,
  download,
  children,
}) {
  const isDownload = Boolean(download);

  return (
    <a
      href={href}
      target={isDownload ? "_self" : "_blank"}
      rel={isDownload ? undefined : "noopener noreferrer"}
      className={className}
      aria-label={ariaLabel}
      download={isDownload ? (typeof download === "string" ? download : true) : undefined}
    >
      {children}
    </a>
  );
});
