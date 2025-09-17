"use client";
import React, { useEffect, useState } from "react";
import SubHeader from "./sub-header";
import { Header } from "./header";

const SUBHEADER_HEIGHT = 40; // px

export default function HeaderBlock() {
  const [showSubHeader, setShowSubHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setShowSubHeader(true);
      } else {
        setShowSubHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-transform duration-300"
      style={{
        transform: showSubHeader ? "translateY(0)" : `translateY(-${SUBHEADER_HEIGHT}px)`
      }}
    >
      <div>
        <SubHeader />
        <div>
          <Header />
        </div>
      </div>
    </header>
  );
}
