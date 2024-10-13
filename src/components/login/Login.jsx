import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React, { useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../../contexts";
import ForgetPassword from "./ForgetPassword";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export default function Login({ setIsExists }) {
  const [isOpen, setIsOpen] = useState(false);
  sessionStorage.removeItem("isAdminMode");
  Cookies.remove("Authorization");
  const { setMessage, setUserId, setUserName, setIsAdmin, navigate, message } =
    useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  //on input change
  const handleInput = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUsername(data.get("username"));
    setPassword(data.get("password"));
  };

  //on LOGIN
  const handleLogin = async () => {
    const requestData = {
      username,
      password,
    };
    try {
      const response = await fetch(`${SERVER_HOST}/login`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const user = await response.json();
        if (user) {
          console.log(user);
          setMessage(["הנך מחובר", true]);
          setUserId(user.id);
          setUserName(user.username);
          setIsAdmin(user.isAdmin);
          Cookies.set("Authorization", user.token);
          handleSuccessfulLogin();
        }
      } else {
        if (response.status == 403) {
          // const response = await fetch(`${SERVER_HOST}/registration/verification`, {
          //   method: "POST",
          //   body: JSON.stringify({email: response.body.email}),
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // });

          setMessage([`המערכת ממתינה לאישור כתובת האימייל שלך`, false]);
          return;
        }
        if (response.status == 404) {
          setMessage([`לא נמצאה התאמה בין הנתונים, נא בדוק את הפרטים ונסה שוב`, false]);
          return;
        }
        setMessage([`אירעה שגיאה במהלך ההתחברות, נסה שוב מאוחר יותר`, false]);
        console.error(`Error during login: ${response.statusText}`);
      }
    } catch (error) {
      setMessage([`אירעה שגיאה לא צפויה במהלך ההתחברות`, false]);
      console.error(`Error during login: ${error.message}`);
    }
  };

  const handleSuccessfulLogin = () => {
    const from = location.state?.from?.pathname || "/";
    console.log(from);
    navigate(from, { replace: true });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 13,
      }}
    >
      <Box
        sx={{
          minHeight: 340,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          טופס התחברות
        </Typography>
        <Box
          component="form"
          onChange={handleInput}
          onSubmit={handleLogin}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="שם משתמש"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            הכנס
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                שכחת סיסמה?
              </Link>
            </Grid>
            <Grid item>
              <Link
                // href="#"
                onClick={() => {
                  setIsExists(false);
                }}
                variant="body2"
              >
                עדיין אינך רשום? הרשם עכשיו
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <ForgetPassword isOpen={isOpen} setIsOpen={setIsOpen}/>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </Container>
  );
}
