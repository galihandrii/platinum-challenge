
import './App.css';
import Landingpage from './pages/Landingpage';
import {Routes,Route} from "react-router-dom";
import Detailcar from './pages/Detailcar';
import Searchcar from './pages/Searchcar';
import Paymentpage from './pages/Paymentpage';
import ProtectedRoute from './hoc/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/Carimobil' element={<Searchcar/>}/>
      <Route path='/Detailmobil/:id' element={<Detailcar/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/Payment' element={<Paymentpage/>}/>
     </Route>
      
    </Routes>
      
     
      
    
  );
}

export default App;
