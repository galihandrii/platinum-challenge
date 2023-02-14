
import './App.css';
import Landingpage from './pages/Landingpage';
import {Routes,Route} from "react-router-dom";
import Detailcar from './pages/Detailcar';
import Searchcar from './pages/Searchcar';
import ProtectedRoute from './hoc/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import PaymentForm from './pages/PaymentForm';
import PaymentCompleted from './pages/PaymentCompleted'



function App() {
  return (
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/Carimobil' element={<Searchcar/>}/>
      <Route path='/Detailmobil/:id' element={<Detailcar/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path='payment-form/:id' element={<PaymentForm />} />
        <Route path='/payment-completed/:id' element={<PaymentCompleted />} />
     </Route>
    </Routes>
      
     
      
    
  );
}

export default App;
