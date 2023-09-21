import { AuthGoogleProvider } from "./context/authGoogle";
import { AppRoutes } from "./routes/routes"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {


  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <AuthGoogleProvider>
          <AppRoutes />
          <ToastContainer />
        </AuthGoogleProvider>
      </div>
    </div>
  )


};