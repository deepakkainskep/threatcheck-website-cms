import React, { useState } from "react";
import { ImageOff } from "lucide-react";

interface CardMediaProps {
  src?: string;
  alt: string;
  badge?: React.ReactNode;
}

/**
 * Renders a content card's cover image with a graceful, on-brand fallback
 * when the image is missing or fails to load (e.g. broken URL, 404).
 * Never lets a raw broken-image icon or bleeding alt text reach the UI.
 */
export const CardMedia: React.FC<CardMediaProps> = ({ src, alt, badge }) => {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showImage = !!src && !errored;

  return (
    <div className="cardMedia">
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={loaded ? "isLoaded" : ""}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="cardMediaPlaceholder">
          <div className="cardMediaPlaceholderIcon">
            <ImageOff size={22} />
          </div>
          <span>No cover image</span>
        </div>
      )}
      {badge}
    </div>
  );
};
