
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ImageGallery from './pages/imgally/ImageGallery';

function App() {
  return (
    <div className="App">
      <div className="image-gallery">



 <BrowserRouter>
 <Routes>
 <Route path="/" element={< ImageGallery/>} />

 </Routes>
 
 </BrowserRouter>
 </div>
    </div>
  );
}

export default App;
