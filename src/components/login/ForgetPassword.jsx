import { Dialog, Transition } from "@headlessui/react";
import * as Yup from "yup";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Box, TextField } from "@mui/material";
import { debounce } from "lodash";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const ForgetPassword = ({ isOpen, setIsOpen }) => {
  const cancelButtonRef = useRef(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [errorData, setErrorData] = useState({
    email: "",
    username: "",
  });

  const handleClose = () => {
    setIsOpen(false);
    setIsDone(false);
    setEmail("");
    setMessage(null);
  };

  const handleInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setEmail(value);
    validateField(name, value);
  };

  const validateField = useCallback(
    debounce(async (name, value) => {
      try {
        await schema.validateAt(name, { [name]: value });
        setErrorData((prev) => ({ ...prev, [name]: "" }));
      } catch (error) {
        setErrorData((prev) => ({ ...prev, [name]: error.message }));
      }
    }, 300),
    []
  );

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('כתובת דוא"ל לא תקינה')
      .required('דוא"ל הוא שדה חובה'),
    username: Yup.string()
      .required("שם משתמש הוא שדה חובה")
      .min(4, "שם המשתמש חייב להכיל לפחות 4 תווים")
      .max(25, "עד 15 תווים"),
  });

  const handleSendEmail = async () => {
    try {
      const response = await fetch(`${SERVER_HOST}/login/forgot-password/`, {
        method: "POST",
        body: JSON.stringify({ requestedEmail: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 400 || response.status === 404) {
        console.log("400");
        const errorMessage = await response.text();
        setMessage([`תקלה בתהליך האיפוס - ${errorMessage}`, false]);
        console.log(errorMessage);
      }
      if (response.status === 200) {
        const message = await response.json();
        console.log(message);
        setMessage([
          "קישור לאיפוס הסיסמה נשלח לכתובת האימייל שלך, נא ללחוץ עליו",
          true,
        ]);
        setEmail("");
        setIsDone(true);
      }
    } catch (error) {
      console.log("catch");
      setMessage([`התהליך נכשל - אנא נסה שוב מאוחר יותר`, false]);
      console.log(`תקלה בתהליך הרישום ${error.message}`);
    }
  };

  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {message !== null && (
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                          {/* <ExclamationTriangleIcon className="w-6 h-6 text-red-600" aria-hidden="true" /> */}
                          <>
                            {message[1] ? (
                              <CheckCircleIcon
                                className="w-6 h-6 text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <FiAlertTriangle className=" w-6 h-6 text-red-500" />
                            )}
                          </>
                        </div>
                      )}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-right px-4">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold leading-6 text-gray-900"
                        >
                          <p>
                            {message
                              ? message[1]
                                ? "מצוין!"
                                : "אופס!"
                              : "איפוס סיסמה"}
                          </p>
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {message
                              ? message[0]
                              : "הזן את כתובת האימייל עמה נרשמת ואנחנו נשלח לך קישור לאיפוס הסיסמה"}
                          </p>
                        </div>

                        {/* Input field for email */}
                        {!isDone && (
                          <div className="mt-4 text-right">
                            {/* <input
                            type="email"
                            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="כתובת האימייל שלך"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          /> */}

                            <TextField
                              margin="normal"
                              dir="rtl"
                              required
                              fullWidth
                              id="email"
                              placeholder="הזן את כתובת האימייל עמה נרשמת"
                              name="email"
                              autoComplete="email"
                              error={!!errorData.email}
                              helperText={errorData.email}
                              value={email}
                              onChange={handleInput}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                    {!message && (
                      <button
                        type="button"
                        className={`inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white  rounded-md shadow-sm ${
                          !email || email.trim() === "" || errorData.email
                            ? "bg-gray-400"
                            : "bg-blue-600  hover:bg-blue-500"
                        } sm:ml-3 sm:w-auto`}
                        onClick={handleSendEmail}
                        disabled={
                          !email || email.trim() === "" || errorData.email
                        }
                      >
                        שלח
                      </button>
                    )}

                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={handleClose}
                    >
                      סגור
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ForgetPassword;
