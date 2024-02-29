import React, { useContext, useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DataContext from '../../contexts';


export default function Login({ setIsNew }) {
  localStorage.removeItem('auth');
  localStorage.removeItem('Authorization');
  const { setMessage, navigate, message, setUserID, setUserName, setIsAdmin } = useContext(DataContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // פונקציות
  //on input change
  const handleInput = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    setUsername(data.get("username"))
    setPassword(data.get("password"))
  };

  //on LOGIN
  const handleLogin = async () => {
    const requestData = {
      username,
      password
    };
    try {
      const response = await fetch('http://localhost:4002/api/login', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const user = await response.json();
        if (user) {
          console.log(user);
          setMessage('Login successful');
          setUserID(user.id)
          setUserName(user.username)
          setIsAdmin(user.isAdmin)
          localStorage.setItem("Authorization", user.token)
          localStorage.setItem("auth", `${username}:${password}:${user.id}`);
          navigate(`/home`);
        }
      }
      else {
        setMessage(`Error during login: ${response.statusText}`);
      }
    } catch (error) {
      setMessage(`Error during login: ${"///"}`);
      console.log(`Error during login: ${error.message}`);
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onChange={handleInput} onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link
                // href="#"
                onClick={() => { setIsNew(false) }}
                variant="body2"
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </Container>
  );
}
