import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateJob from "../Pages/CreateJob";
import Home from "../Pages/Home";
import JobDetails from "../Pages/JobDetails";
import LandingPage from "../Pages/LandingPage";
import DashboardLayout from "../Pages/dashboard/DashboardLayout";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import SliderServicePage from "../components/SliderServicePage";
import Users from "../Pages/dashboard/admin/Users";
import Dashboard from "../Pages/dashboard/admin/Dashboard";
import BlogPage from "../Pages/blog/BlogPage";
import PostDetails from "../Pages/blog/PostDetails";
import CategoryPosts from "../Pages/blog/CategoryPosts";
import EditPost from "../Pages/blog/EditPost";
import DeletePost from "../Pages/blog/DeletePost";
import CreatePost from "../Pages/blog/CreatePost";
import AuthorPosts from "../Pages/blog/AuthorPosts";
import ContactUs from "../Pages/ContactUs";
import Payment from "../Pages/Payment";
import JobFairDetails from "../Pages/fairs/JobFairDetails";
import CompanyList from "../Pages/fairs/CompanyList";
import EventDetails from "../Pages/fairs/EventDetails";
import Payments from "../Pages/dashboard/admin/Payments";
import AllUsers from "../Pages/dashboard/admin/AllUsers";
import BlogData from "../Pages/dashboard/admin/BlogData";
import PostData from "../Pages/dashboard/admin/PostData";
import Resume from "../Pages/Resume";
import PostingJob from "../Pages/PostingJob";
import BlogForm from "../Pages/blog/BlogForm";
import Blogform1 from "../Pages/blog/Blogform1";
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import UserPayment from "../Pages/dashboard/UserPayment";
import MyEvents from "../Pages/dashboard/MyEvents";
import EventTable from "../Pages/dashboard/admin/EventTable";
import EventData from "../Pages/dashboard/admin/EventData";
import VideoContentForm from "../Pages/VideoContentForm";
import AboutUs from "../Pages/AboutUs";
import Success from "../Pages/PaymentCard/Success";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const role = useUserRole();

  if (!role) {
    return <p>Loading...</p>;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const useUserRole = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = await getAccessTokenSilently();
        const userRole = user['https://myapp.example.com/'][0];
        setRole(userRole);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [getAccessTokenSilently, user]);

  return role;
};

const USER_ROLES = {
  ADMIN: 'Admin',
  RECRUITER: 'Recruiter',
  APPLICANT: 'Applicant',
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", element: <LandingPage />
      },
      {
        path: "/dashmenu/*", element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <Dashboard />, },
          { path: 'dashboard/users', element: <Users /> },
          { path: 'Payments', element: <Payments /> },
          { path: 'AllUser', element: <AllUsers /> },
          { path: "BlogData", element: <BlogData />, },
          { path: "PostData", element: <PostData /> },
          { path: "EventData", element: <EventData /> },
          { path: "UserPayment", element: <UserPayment /> },
          { path: "Eventform", element: <MyEvents /> },
          { path: "MyEvents", element: <EventTable /> },
          { path: "Content", element: <VideoContentForm /> },
          { path: "my-job", element: <MyJobs /> },
        ]
      },
      { path: "/success", element: <Success /> },
      { path: "blogform", element: <BlogForm /> },
      { path: "/post-blog", element: <Blogform1 /> },
      { path: "/about", element: <AboutUs /> },
      {
        path: "blogs", element: <BlogPage />,
        children: [
          // { path: "post/categories/:tag", element: <CategoryPosts /> },
          { path: "post/categories/:id", element: <CategoryPosts /> },
          { path: "post/:id/edit", element: <EditPost /> },
          { path: "deletepost", element: <DeletePost /> },
          // { path: "profile/:id", element: <UserProfile /> },
          // { path: "authors", element: <Author /> },
          { path: "create", element: <CreatePost /> },
          { path: "post/users/:id", element: <AuthorPosts /> },

        ]
      },
      { path: "/search-job", element: <Home /> },
      { path: "/post-job", element: <PostingJob /> },

      { path: "/salary", element: <SalaryPage /> },
      { path: "/slider", element: <SliderServicePage /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/post-payment", element: <Payment /> },
      { path: "/events", element: <JobFairDetails /> },
      { path: "/companylist", element: <CompanyList /> },
      // { path: "/eventd  etails", element: <EventDetails /> },
      { path: "/resume", element: <Resume /> },
      {
        path: "edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/all-jobs/${params.id}`),
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
      {
        path: "/event/:id",
        element: <EventDetails />,
      },
    ],
  },
]);

export default router; 
