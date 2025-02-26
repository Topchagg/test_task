import MainSection from "./sections/main/main"
import ProductPage from "./entities/product/productPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainSection/>}/>
          <Route path="/products/:id" element={<ProductPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
