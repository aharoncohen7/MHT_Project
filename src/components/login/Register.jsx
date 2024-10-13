import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { debounce } from "lodash";
import React, { useCallback, useContext, useState } from "react";
import * as Yup from "yup";
import UserContext from "../../contexts";
import { phoneValidator } from "../../helpers";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const CLIENT_HOST = import.meta.env.VITE_CLIENT_HOST;
// console.log(SERVER_HOST)

export default function Register({ setIsExists }) {
  const { setMessage, message } = useContext(UserContext);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [errorData, setErrorData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
    if (name === "username") {
      debouncedCheckUsername(value);
    }
  };

  // סכמת ולידציה עם פונקציית phoneValidator
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("שם הוא שדה חובה")
      .min(4, "שם המשתמש חייב להכיל לפחות 4 תווים")
      .max(30, "עד 30 תווים"),
    email: Yup.string()
      .email('כתובת דוא"ל לא תקינה')
      .required('דוא"ל הוא שדה חובה'),
    phone: Yup.string()
      .required("מספר טלפון הוא שדה חובה")
      .test("phone-validation", "מספר טלפון לא תקין", function (value) {
        if (!value) return true; // אם השדה ריק, לא מבצע ולידציה מותאמת אישית
        const errorMessage = phoneValidator(value);
        return errorMessage === ""; // מחזיר true אם המספר תקין, אחרת false
      }),
    username: Yup.string()
      .required("שם משתמש הוא שדה חובה")
      .min(4, "שם המשתמש חייב להכיל לפחות 4 תווים")
      .max(25, "עד 15 תווים"),
    password: Yup.string()
      .matches(/^[^\u0590-\u05FF]+$/, "הסיסמה לא יכולה לכלול תווים בשפה העברית")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "הסיסמה חייבת לכלול לפחות מספר אחד ואות אחת"
      )
      .min(4, "הסיסמה חייבת להיות לפחות 4 תווים")
      .max(8, "הסיסמה לא יכולה להיות ארוכה מ-8 תווים")
      .required("סיסמה היא שדה חובה"),
  });

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

  //Registration
  const handleRegister = async () => {
    try {
      if(formData.phone.startsWith("+972")){
        formData.phone = `0${formData.phone.slice(4)}`;
        console.log(formData.phone)
      }
      const response = await fetch(
        `${SERVER_HOST}/registration`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 400 || response.status === 404) {
        console.log("400");
        const errorMessage = await response.text();
        setMessage([`תקלה בתהליך הרישום: ${errorMessage} `, false]);
        console.log(errorMessage);
      }
      if (response.status === 200) {
        const user = await response.json();
        console.log(user);
        if (user) {
          setMessage([
            "נרשמת! קישור לאימות כתובת האימייל נשלח אליך, נא לאשר אותו",
            true,
          ]);
          window.location.href = CLIENT_HOST;
        } else {
          // console.log("try > else");
          console.log("תקלה לא מזוהה", response);
          setMessage([`משתמש לא  נרשם - תקלה לא מזוהה`, false]);
        }
      }
    } catch (error) {
      console.log("catch");
      setMessage([`לצערנו אריעה תקלה בתהליך הרישום, נסה מאוחד יותר`, false]);
      console.log(`תקלה בתהליך הרישום ${error.message}`);
    }
  };

  const onSubmit = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log("כל השדות תקינים, מתחילים את השליחה לשרת");
      handleRegister();
    } catch (error) {
      console.log("שגיאת וולידציה:", error);
      let validationErrors = {};

      if (error.inner && Array.isArray(error.inner)) {
        validationErrors = error.inner.reduce(
          (errors, err) => ({
            ...errors,
            [err.path]: err.message,
          }),
          {}
        );
      } else if (error.path && error.message) {
        validationErrors[error.path] = error.message;
      } else {
        validationErrors.general = "שגיאה בוולידציה של הטופס";
      }

      setErrorData(validationErrors);
      console.log("הבדיקה נכשלה, השדות הבאים אינם תקינים:", validationErrors);
    }
  };

  const handleCheckUsername = async (username) => {
    if (username.length === 0) {
      setIsUsernameAvailable(null);
      return;
    }

    try {
      const response = await fetch(
        `${SERVER_HOST}/registration/check-username/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsUsernameAvailable(true);
      } else if (response.status === 400) {
        setIsUsernameAvailable(false);
      } else if (response.status === 404) {
        const errorMessage = await response.text();
        setMessage([`תקלה בבדיקת שם המשתמש `, false]);
        console.log(errorMessage);
      }
    } catch (error) {
      console.log("catch", error.message);
      setMessage([` תקלה בבדיקת שם המשתמש`, false]);
      console.log(`תקלה בבדיקת שם המשתמש ${error.message}`);
    }
  };

  const debouncedCheckUsername = useCallback(
    debounce((username) => handleCheckUsername(username), 500),
    []
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: 360,
        }}
      >
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <Box
          className="text-right"
          component="form"
          onChange={handleInput}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="שם מלא"
            name="name"
            autoComplete="name"
            style={{ direction: "rtl" }}
            autoFocus
            error={!!errorData.name}
            helperText={errorData.name}
          />

          <TextField
            dir="ltr"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="מספר טלפון"
            name="phone"
            autoComplete="phone"
            error={!!errorData.phone}
            helperText={errorData.phone}
          />

          <TextField
            margin="normal"
            dir="ltr"
            required
            fullWidth
            id="email"
            label="אימייל"
            name="email"
            autoComplete="email"
            error={!!errorData.email}
            helperText={errorData.email}
          />

          <Typography component="h5" variant="h9" align="center">
            בחר שם משתמש וסיסמה
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="שם משתמש"
            name="username"
            autoComplete="username"
            error={!!errorData.username || isUsernameAvailable === false}
            helperText={
              errorData.username ||
              (isUsernameAvailable === false ? "שם המשתמש תפוס" : "") ||
              (isUsernameAvailable === true ? "שם המשתמש זמין" : "")
            }
          />
          {/* {isUsernameAvailable === false && (
            <p className="text-pink-600 text-sm">שם המשתמש תפוס</p>
          )}
          {isUsernameAvailable === true && (
            <p className="text-green-600 text-sm">שם המשתמש זמין</p>
          )} */}

          <TextField
            dir="ltr"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!errorData.password}
            helperText={errorData.password}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onSubmit}
            disabled={
              errorData.name !== "" ||
              errorData.email !== "" ||
              errorData.phone !== "" ||
              errorData.username !== "" ||
              errorData.password !== "" ||
              !isUsernameAvailable
            }
          >
            שלח טופס
          </Button>

          {errorData.general && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {errorData.general}
            </Typography>
          )}
          <Grid container>
            <Grid item>
              <Link
                onClick={() => {
                  setIsExists(true);
                }}
                variant="body2"
              >
                כבר יש לך חשבון ? הכנס
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </Container>
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       marginTop: 15,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       minHeight: 360,
    //     }}
    //   >
    //     <Typography component="h1" variant="h5">
    //       הרשמה
    //     </Typography>
    //     <Box
    //       className="text-right"
    //       component="form"
    //       onChange={handleInput}
    //       // onSubmit={handleLogin}
    //       noValidate
    //       sx={{ mt: 1 }}
    //     >
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="name"
    //         label="שם מלא"
    //         name="name"
    //         autoComplete="name"
    //         style={{ direction: "rtl" }}
    //         autoFocus
    //       />
    //       {errorData.name && (
    //         <p className="text-pink-600 text-sm">{errorData.name}</p>
    //       )}

    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="phone"
    //         label="מספר טלפון"
    //         name="phone"
    //         autoComplete="phone"
    //         autoFocus
    //       />
    //       {errorData.phone && (
    //         <p className=" text-pink-600 text-sm">{errorData.phone}</p>
    //       )}

    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="אימייל"
    //         name="email"
    //         autoComplete="email"
    //         autoFocus
    //       />
    //       {errorData.email && (
    //         <p className="text-pink-600 text-sm">{errorData.email}</p>
    //       )}

    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="username"
    //         label="שם משתמש"
    //         name="username"
    //         autoComplete="username"
    //         autoFocus
    //       />
    //         {errorData.username && (
    //         <p className="text-pink-600 text-sm">{errorData.username}</p>
    //       )}
    //       {isUsernameAvailable === false && (
    //         <p className="text-pink-600 text-sm">שם המשתמש תפוס</p>
    //       )}
    //       {isUsernameAvailable === true && (
    //         <p className="text-green-600 text-sm">שם המשתמש זמין</p>
    //       )}

    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="סיסמה"
    //         type="password"
    //         id="password"

    //         autoComplete="password"
    //       />
    //       {errorData.password && (
    //         <p className="text-pink-600 text-sm">{errorData.password}</p>
    //       )}

    //       {/* <FormControlLabel
    //         control={<Checkbox value="remember" color="primary" />}
    //         label="Remember me"
    //       /> */}
    //       <Button
    //         // type="submit"
    //         fullWidth
    //         variant="contained"
    //         sx={{ mt: 3, mb: 2 }}
    //         onClick={onSubmit}
    //       >
    //         שלח טופס
    //       </Button>
    //       <Grid container>
    //         <Grid item xs>
    //           {/* <Link href="#" variant="body2">
    //             Forgot password?
    //           </Link> */}
    //         </Grid>
    //         <Grid item>
    //           {/* <Link href="#" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link> */}
    //           <Link
    //             onClick={() => {
    //               setIsExists(true);
    //             }}
    //             //  href="https://vortly.onrender.com/"
    //             variant="body2"
    //           >
    //             כבר יש לך חשבון ? הכנס
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    //   {message && <p style={{ color: "red" }}>{message}</p>}

    //   {/* <Copyright sx={{ mt: 5 }} /> */}
    // </Container>
  );
}
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {' © '}
//       <Link color="inherit" href="https://vortly.onrender.com/">
//         Chi.Dot
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // סכמה של מבנה השדות
// const schema = Yup.object().shape({
//   name: Yup.string().required("שם הוא שדה חובה"),
//   email: Yup.string()
//     .email('כתובת דוא"ל לא תקינה')
//     .required('דוא"ל הוא שדה חובה'),
//   phone: Yup.string()
//     .matches(/^[0-9]+$/, "מספר הטלפון יכול לכלול רק מספרים")
//     .required("מספר טלפון הוא שדה חובה")
//     .min(10, "מספר לא תקין")
//     .max(10, "מספר לא תקין"),
//   username: Yup.string().required("שם משתמש הוא שדה חובה")
//   .min(4, "שם המשתמש חייב להכיל לפחות 4 תווים").max(15, "עד 15 תווים"),
//   password: Yup.string()
//     .matches(/^[^\u0590-\u05FF]+$/, "הסיסמה לא יכולה לכלול תווים בשפה העברית")
//     .matches(
//       /^(?=.*[a-zA-Z])(?=.*[0-9])/,
//       " הסיסמה חייבת לכלול לפחות מספר אחד ואות אחת"
//     )
//     .min(4, "הסיסמה חייבת להיות לפחות 4 תווים")
//     .max(8, "הסיסמה לא יכולה להיות ארוכה מ-8 תווים")
//     .required("סיסמה היא שדה חובה"),
// });

// בשליחת הטופס
// const onSubmit = async () => {
//   try {
//     await schema.validate(formData, { abortEarly: false });
//     console.log("כל השדות תקינים, מתחילים את השליחה לשרת");
//     handleRegister();
//   } catch (error) {
//     const validationErrors = error.inner.reduce((errors, err) => {
//       return {
//         ...errors,
//         [err.path]: err.message,
//       };
//     }, {});
//     setErrorData(validationErrors);
//     console.log(errorData);
//     console.log("הבדיקה נכשלה, השדות הבאים אינם תקינים:", validationErrors);
//   }
// };
