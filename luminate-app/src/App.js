import React from "react";
import Input from "./components/UI/Input";
import "./style/App.css";

const App = () => {
  return (
    <div>
      <header>
        <title>Luminate</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.png" />
      </header>
      <body className="container">
        <Input />
      </body>
    </div>
  );
};

export default App;
