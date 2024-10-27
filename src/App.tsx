import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AudioRecorder from "./components/AudioRecorder";
function App() {
  return (
    <>
      <Routes>
        <Route path="home/" element={<HomePage />} />
        <Route path="" element={<AudioRecorder />} />
      </Routes>
    </>
  );
}

export default App;
