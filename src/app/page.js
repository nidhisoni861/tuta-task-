"use client";

import { use, useState } from "react";
import { checkUrlISExist } from "../utils/mockServer";
import { useRef } from "react";


export default function Home() {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [serverResult, setServerResult] = useState("");
  const timer = useRef(null);

  function checkUrl(val) {
    try {
      const correctUrl = new URL(val);
      return correctUrl.protocol === "http:" || correctUrl.protocol === "https:";
    } catch (err) {
      return false;
    }
  }
  async function doCheck(url) {
    setServerResult("checking");
    const result = await checkUrlISExist(url);
    setServerResult(result);
  }

  function handleChange(e) {
    const val = e.target.value;
    setUrl(val);
    const isUrlValiad = checkUrl(val);
    setIsValid(isUrlValiad);
    if (isUrlValiad) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => doCheck(val), 800);
    } else {
      setServerResult("");
      clearTimeout(timer.current);
    }

  }

  return (
    <>
      <div
        style={{
          height: "100vh",
          background: "#fff",
          color: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="https://example.com"
          style={{
            width: "420px",
            padding: "14px 16px",
            borderRadius: "10px",
            border: "1px solid #555",
            fontSize: "16px",
            outline: "none",
          }}
        />

         <div
        style={{
          width: "420px",
          minHeight: "52px", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems:"center",
          textAlign: "center",
          gap: "6px",
        }}
      >
        {isValid === true && (
          <p style={{ color: "green", margin: 0 }}>Format looks good</p>
        )}

        {isValid === false && (
          <p style={{ color: "red", margin: 0 }}>Not a valid URL</p>
        )}

        {serverResult === "checking" && <p style={{ margin: 0 }}>Checking...</p>}

        {serverResult && serverResult !== "checking" && serverResult.exists && (
          <p style={{ color: "green", margin: 0 }}>
            URL exists - {serverResult.type === "file" ? "File" : "Folder"}
          </p>
        )}

        {serverResult && serverResult !== "checking" && serverResult.exists === false && (
          <p style={{ color: "red", margin: 0 }}>URL does not exist</p>
        )}
      </div>
    </div>
    </>


  );
} 