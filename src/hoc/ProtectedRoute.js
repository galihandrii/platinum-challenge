

import { useEffect, useState } from "react"
import { Outlet} from "react-router-dom"
import { useNavigate } from "react-router-dom"



const ProtectedRoute = () => {
const [isLogin, setIsLogin] = useState(false)
const [loading, setLoading] = useState(true)
const navigate = useNavigate('');

useEffect(()=>{
    setLoading(true)
    const token = localStorage.getItem('token')
    if (!token) {
        setIsLogin(false)
        setLoading(false)
    } else {
        setIsLogin(true)
        setLoading(false)
    }
},[isLogin])


if (loading) {
    return ('please login')
}

return isLogin ? <Outlet/> : navigate('/')

    
}

export default ProtectedRoute;