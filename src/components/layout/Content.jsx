// import React, { useContext } from "react";
// import { Route, Routes } from "react-router-dom";
// import UserContext from "../../contexts";

// import ContactUsForm from "../about/ContactUsForm";
// import AboutUs from "../AboutUs";
// import NewPost from "../NewPost";
// import Dashboard from "../dashboard/Dashboard";
// import { Edit } from "../Edit";
// import SignIn from "../login/SignIn";
// import NotFound from "../NotFound";
// import AllPosts from "../posts/AllPosts";
// import SinglePost from "../posts/SinglePost";

// const Content = ({}) => {
//   const { isAdmin, adminMode } = useContext(UserContext);
//   return (
//     <span
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
     
//         <Routes>
//           <Route path="login" element={<SignIn />} />
//           <Route path="addition" element={<NewPost />} />
//           <Route
//             path="dashboard/"
//             element={isAdmin && adminMode ? <Dashboard /> : <NotFound />}
//           />
//           <Route path="about" element={<AboutUs />} />
//           <Route path="about/contact-us" element={<ContactUsForm />} />
//           <Route
//             path="/"
//             element={<AllPosts  />}
//           />
//           <Route
//             path="home/*"
//             element={<AllPosts  />}
//           />
//           <Route path="post/:postId" element={<SinglePost />} />
//           <Route path="edit/:postId" element={<Edit />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//     </span>
//   );
// };

// export default Content;
