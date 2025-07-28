import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="container py-3 mx-auto flex-grow">
        Main Content
      </main>
      <Footer/>
    </div>
      
    </BrowserRouter>
  )
}

export default App
