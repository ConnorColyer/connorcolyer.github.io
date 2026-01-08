"use client";

import { useState } from "react";
import Button from "./Button";
import { site } from "@/content/site";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="secondary" onClick={handleCopy}>
      {copied ? "Copied" : "Copy email"}
    </Button>
  );
}
