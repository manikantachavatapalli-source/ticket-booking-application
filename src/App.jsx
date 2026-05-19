import './App.css'
import Details from './components/Details'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './components/Home'
import BusDetails from './components/BusDetails'
import TrainDetails from './components/TrainDetails'
import Booking from './components/Bookings'
import { Routes,Route } from 'react-router-dom'
import ProtectedRoute from './components/ProetctedRoute'
import NotFound from './components/NotFound'
import EachItemDetails from './components/EachItemDetails'

function App() {

  return (
    <Routes> 
      <Route path='/signup' element={<Signup />} />  
      <Route path='/signin' element={<Signin/>} />
      <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      <Route path='/bookings' element={<ProtectedRoute> <Booking /> </ProtectedRoute>} />
      <Route path='/details' element={<ProtectedRoute> <Details /> </ProtectedRoute> } />
      <Route path='/busdetails' element={<ProtectedRoute> <BusDetails /> </ProtectedRoute> } />
      <Route path='/traindetails' element={<ProtectedRoute> <TrainDetails /> </ProtectedRoute> } />
      <Route path='/:category/:id' element={<ProtectedRoute> <EachItemDetails /> </ProtectedRoute>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
