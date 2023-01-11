import React, { useState } from "react";
import { createDetailsWidget } from "@livechat/agent-app-sdk";

function App() {
  const [name, setName] = useState("");

  createDetailsWidget().then((widget) => {
    widget.on("customer_profile", (profile) => {
      setName(profile.name);
    });
  });

  return (
    <div className="flex justify-center items-center p-10">
      <h1>{name}</h1>
    </div>
  );
}

export default App;
