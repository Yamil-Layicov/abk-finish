import { useRoutes } from "react-router-dom";
import routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      {useRoutes(routes)}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <CheckFilter /> */}
    </>
  );
};

export default App;

// export const CheckFilter = () => {
//   let arr = [
//     { id: 1, category: "alma" },
//     { id: 2, category: "armud" },
//     { id: 3, category: "alma" },
//     { id: 4, category: "armud" },
//   ];

//   return (
//     <div>
//       {arr.map((item) => (
//         <div key={item.id} style={{ display: "flex", gap: "20px" }}>
//           {item.category}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//           >
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M17.2803 4.71967C17.5732 5.01256 17.5732 5.48744 17.2803 5.78033L8.03033 15.0303C7.88968 15.171 7.69891 15.25 7.5 15.25C7.30109 15.25 7.11032 15.171 6.96967 15.0303L2.71967 10.7803C2.42678 10.4874 2.42678 10.0126 2.71967 9.71967C3.01256 9.42678 3.48744 9.42678 3.78033 9.71967L7.5 13.4393L16.2196 4.71967C16.5125 4.42678 16.9874 4.42678 17.2803 4.71967Z"
//               fill="#231781"
//             />
//           </svg>
//         </div>
//       ))}
//     </div>
//   );
// };
