import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddQueries from "../pages/AddQueries/AddQueries";
import Queries from "../pages/Queries/Queries";
import MyQueries from "../pages/MyQueries/MyQueries";
import QueryDetails from "../pages/QueryDetails/QueryDetails";
import UpdateQueryDetails from "../pages/UpdateQueryDetails/UpdateQueryDetails";
import MyRecommendation from "../pages/MyRecommendation/MyRecommendation";
import RecommendationsForMe from "../pages/RecommendationsForMe/RecommendationsForMe";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
     
      children:[
        {
            path:"/",
            element:<Home></Home>,
           
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        {
          path:"/addQueries",
          element:<AddQueries></AddQueries>
        },
        {
          path:"/allQueries",
          element:<Queries></Queries>,
          loader:()=>fetch('http://localhost:5000/Queries')

        },
        {
          path:"/myQueries/:email",
          element:<MyQueries></MyQueries>,
          loader:({params})=>fetch(`http://localhost:5000/Queries/user/${params.email}`)

        },
        // {
        //   path:"/spotDetails/:id",
        //   element:<PrivateRoute><SpotDetails></SpotDetails></PrivateRoute>,
        //   loader:({params})=>fetch(`https://journey-junction-server-gamma.vercel.app/tourSpot/${params.id}`)
        // },
        {
          path:"/queryDetails/:id",
          element:<QueryDetails></QueryDetails>,
          loader:({params})=>fetch(`http://localhost:5000/Queries/${params.id}`)
        },
        {
          path:"/updateQuery/:id",
          element:<UpdateQueryDetails></UpdateQueryDetails>

        },
        {
          path:"/myRecommendations/:email",
          element:<MyRecommendation></MyRecommendation>,
          loader:({params})=>fetch(`http://localhost:5000/recommendations/user/${params.email}`)
        },
        {
          path: "/recommendationsForMe/:email",
          element: <RecommendationsForMe />,
          loader: ({ params }) => fetch(`http://localhost:5000/recommendationForMe/${params.email}`)
            
        }
        
      ]
    },
  ]);

  export default router;