import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Live from "./Component/Live";

function App() {
  return (
    <>
      <BrowserRouter>
        <Live />
      </BrowserRouter>
    </>
  );
}

export default App;
