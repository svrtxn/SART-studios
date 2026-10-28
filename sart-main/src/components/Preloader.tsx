"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already shown in this session
    const hasLoaded = sessionStorage.getItem("sart_preloader_shown");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("sart_preloader_shown", "true");
          }, 250);
          return 100;
        }
        return prev + 15;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className={`preloader-overlay ${progress === 100 ? "preloader-exit" : ""}`}
    >
      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <span className="preloader-sart-s">S</span>
          <span className="preloader-sart-rest">ART STUDIOS</span>
        </div>

        <div className="preloader-bar-track">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="preloader-status">
          <span className="preloader-dot" />
          <span>INICIALIZANDO ECOSISTEMA · {progress}%</span>
        </div>
      </div>
    </div>
  );
}
