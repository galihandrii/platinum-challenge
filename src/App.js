
import './App.css';
import Landingpage from './pages/Landingpage';
import {Routes,Route} from "react-router-dom";
import Detailcar from './pages/Detailcar';
import Searchcar from './pages/Searchcar';
import Paymentpage from './pages/Paymentpage';
import ProtectedRoute from './hoc/ProtectedRoute';
import PaymentCompleted from './pages/PaymentCompleted';
import { PaymentForm } from './pages/PaymentForm';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/Carimobil' element={<Searchcar/>}/>
      <Route path='/Detailmobil/:id' element={<Detailcar/>}/>
      {/* <Route element={<ProtectedRoute/>}> */}
        {/* <Route path='/Payment' element={<Paymentpage/>}/> */}
        <Route path='payment-form/:id' element={<PaymentForm />} />
        <Route path='/payment-completed/:id' element={<PaymentCompleted />} />
      {/* </Route> */}
      
    </Routes>
      
     
      
    
  );
}

export default App;
