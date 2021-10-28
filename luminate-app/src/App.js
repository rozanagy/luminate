import React from "react";
import "./style/App.css";
import FormComponent from "./components/UI/FormComponent";

const App = () => {
  return (
    <div>
      <header>
        <title>Luminate</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.png" />
      </header>
      <body className="container">
        <div className="card">
          <FormComponent />
        </div>
      </body>
    </div>
  );
};

export default App;
