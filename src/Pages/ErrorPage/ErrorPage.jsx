import { useNavigate } from "react-router-dom"
import img404 from "../../assets/images/404.png"

const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <div className="h-screen flex justify-center my-myMargin">
        <div>
            <h1 className="text-4xl font-bold text-center">404</h1>
            <h2 className="text-3xl font-medium text-gray-500 text-center my-4">Ops!! Page Not Found.</h2>
            <div className="flex justify-center">
                <img src={img404} alt="" className="h-[50vh]" />
            </div>
            <div className="flex justify-center">
                <button onClick={()=>navigate("/")} className="btn btn-outline">Go Home</button>
            </div>
        </div>
    </div>
  )
}

export default ErrorPage