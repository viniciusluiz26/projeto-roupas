import { AuthGoogleProvider } from "./context/authGoogle";
import { AppRoutes } from "./routes/routes"


export const App = () => {
  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
      <AuthGoogleProvider>
      <AppRoutes />
      </AuthGoogleProvider>
      </div>
    </div>
  )
  
  
};