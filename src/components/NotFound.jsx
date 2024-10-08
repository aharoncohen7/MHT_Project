import { ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ButtonClick } from "./ButtonClick";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          {/* <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1> */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            עמוד לא נמצא
          </h1>
          {/* <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p> */}
          <p className="mt-6 text-base leading-7 text-gray-600">
            אופס! עמוד זה עדיין לא קיים. עמך הסליחה.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <ButtonClick
              // href="https://vortly.onrender.com/"
              onClick={() => navigate("/")}
            // className="inline-flex items-center rounded-md bg-indigo-200 px-3 py-3 text-xl font-medium text-blue-700 ring-1 ring-inset ring-blue-1900/10"

              // className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              חזור לדף הבית
            </ButtonClick>
            {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </div>
      </main>
    </>
  );
}
