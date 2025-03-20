import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import AppRouter from "./AppRouter"
import AppBarComponent from "./Components/AppBar"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "./Components/AppBar/Account"
import { ConfirmProvider } from "material-ui-confirm"
const App = () => {

  return(
    
    <AuthProvider>
      <ConfirmProvider>
        <Router>
          <AppBarComponent/>
          <AppRouter/>
          <ToastContainer position="top-right" autoClose={3000}/>
        </Router>
      </ConfirmProvider>
  </AuthProvider>

  )
}

export default App