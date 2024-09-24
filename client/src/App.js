import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CustomRoutes from "./components/Header/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="p-1 md:p-8 font-poppins bg-[#e9dcfe] h-screen">
        <div
          id="page"
          className="page w-full h-full bg-[#f6f4f8] p-6 rounded-lg overflow-y-auto scroll-smooth"
        >
          <Header />
          <div className="flex items-start gap-6 flex-wrap">
            <Routes>
              <Route path="/*" element={<CustomRoutes />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </Router>
  );
}
 
export default App;
