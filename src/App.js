
import './App.css';
import Landingpage from './pages/Landingpage';
import {Routes,Route} from "react-router-dom";
import Detailcar from './pages/Detailcar';
import Searchcar from './pages/Searchcar';
import Paymentpage from './pages/Paymentpage';
import PaymentList from './pages/PaymentList';
import PaymentComplete from './pages/PaymentComplete';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/Carimobil' element={<Searchcar/>}/>
      <Route path='/Detailmobil/:id' element={<Detailcar/>}/>
      <Route path='/Payment' element={<Paymentpage/>}/>
      <Route path='/payment-list' element={<PaymentList/>}/>
      <Route path='/payment-completed' element={<PaymentComplete/>}/>
    </Routes>
      
     
      
    
  );
}

export default App;
