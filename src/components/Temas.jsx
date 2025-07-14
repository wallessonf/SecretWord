import React, { useEffect, useState } from "react";
import "./Temas.css";

function Temas() {
  const [tema, setTema] = useState("light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(tema);
  }, [tema]);

  function alternarTema() {
    setTema((temaAtual) => (temaAtual === "light" ? "dark" : "light"));
  }

  return (
    <>
      <div
        className="theme-toggle"
        onClick={alternarTema}
        style={{ position: "fixed", top: 10, right: 10 }}
      >
        <div
          className={`toggle-ball ${tema === "dark" ? "right" : "left"}`}
        ></div>
      </div>
    </>
  );
}

export default Temas;
