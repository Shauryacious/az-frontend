import React from "react";
import TopUtilityHeader from "./TopUtilityHeader";
import MainNavHeader from "./MainNavHeader";

export default function Header() {
  return (
    <>
      <TopUtilityHeader />
      {/* Spacer to offset the fixed TopUtilityHeader height */}
      <div className="w-full" />
      <MainNavHeader />
    </>
  );
}
