import React, { useState, useContext } from 'react';
import DataContext from '../../contexts';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {' © '}
      <Link color="inherit" href="http://localhost:5173/">
        Chi.Dot
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Register({ setIsNew }) {
  const [errors, setErrors] = useState({});
  const { setMessage, message, navigate, setUserID, setUserName } = useContext(DataContext)
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*[\u0590-\u05FF])/;

  // בדיקת הסיסמה על פי הביטוי הרגולרי
  if (!passwordRegex.test("a67א78")) {
    // הסיסמה מכילה תווים בשפה העברית
    console.log("הסיסמה אינה יכולה להכיל תווים בשפה העברית");
  }





  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });


  const [errorData, setErrorData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });


  const handleInput2 = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  const schema = Yup.object().shape({
    name: Yup.string().required('שם הוא שדה חובה'),
    email: Yup.string().email('כתובת דוא"ל לא תקינה').required('דוא"ל הוא שדה חובה'),
    phone: Yup.string().matches(/^[0-9]+$/, 'מספר הטלפון יכול לכלול רק מספרים').required('מספר טלפון הוא שדה חובה'),
    username: Yup.string().required('שם משתמש הוא שדה חובה'),
    password: Yup.string()
      .matches(/^[^\u0590-\u05FF]+$/, 'הסיסמה לא יכולה לכלול תווים בשפה העברית')
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, ' הסיסמה חייבת לכלול לפחות מספר אחד ואות אחת')
      .min(4, 'הסיסמה חייבת להיות לפחות 4 תווים')
      .max(8, 'הסיסמה לא יכולה להיות ארוכה מ-8 תווים')
      .required('סיסמה היא שדה חובה'),
  });

  // const onSubmit = async () => {
  //   try {
  //     await schema.validate(formData, { abortEarly: false });
  //     // אם הבדיקה עברה בהצלחה, נמשיך לשלב הבא - לשליחת הבקשה לשרת
  //     console.log('כל השדות תקינים, מתחילים את השליחה לשרת');
  //     handleRegister()
  //   } catch (error) {
  //     // אם הבדיקה נכשלה, נתפס את השגיאה ונציג את הודעות השגיאה למשתמש
  //     const validationErrors = error.inner.reduce((errors, err) => {
  //       return {
  //         ...errors,
  //         [err.path]: err.message
  //       };
  //     }, {});
  //     setErrors(validationErrors);
  //     console.log()
  //     console.log('הבדיקה נכשלה, השדות הבאים אינם תקינים:', validationErrors);
  //   }
  // };

  const onSubmit = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log('כל השדות תקינים, מתחילים את השליחה לשרת');
      handleRegister();
    } catch (error) {
      const validationErrors = error.inner.reduce((errors, err) => {
        return {
          ...errors,
          [err.path]: err.message
        };
      }, {});
      setErrorData(validationErrors);
      console.log(errorData);
      console.log('הבדיקה נכשלה, השדות הבאים אינם תקינים:', validationErrors);
    }
  };





  let message2;

  // const schema = Yup.object().shape({
  //   name: Yup.string().required('שם הוא שדה חובה'),
  //   email: Yup.string().email('כתובת דוא"ל לא תקינה').required('דוא"ל הוא שדה חובה'),
  //   phone: Yup.string().matches(/^[0-9]+$/, 'מספר הטלפון יכול לכלול רק מספרים').required('מספר טלפון הוא שדה חובה'),
  //   username: Yup.string().required('שם משתמש הוא שדה חובה'),
  //   password: Yup.string().required('סיסמה היא שדה חובה'),
  // });






  // פונקציות
  //on input change
  // const handleInput = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   setName(data.get("name"))
  //   setUsername(data.get("username"))
  //   setPassword(data.get("password"))
  //   setEmail(data.get("email"))
  //   setPhone(data.get("phone"))
  // };

  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   resolver: yupResolver(schema)
  // });


  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  //Registration 
  const handleRegister = async () => {
    // const requestData = {
    //   name,
    //   phone,
    //   email,
    //   username,
    //   password
    // };

    try {
      const response = await fetch('http://localhost:4002/api/registration', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 400 || response.status === 404) {
        console.log("400");
        const errorMessage = await response.text();
        setMessage(`${errorMessage} :תקלה בתהליך הרישום `)
        console.log(errorMessage);
      }
      if (response.status === 200) {
        const user = await response.json();
        console.log(user);
        if (user) {
          setMessage('משתמש נרשם בהצלחה, נא להכנס');
          setUserID(user.id)
          setUserName(user.username)
          localStorage.setItem("auth", `${username}:${password}:${user.id}`);
          navigate(`/home`);
        }
        else {
          console.log("try>else");
          console.log('משתמש נרשם: תקלה לא מזוהה', response);
          setMessage(`משתמש נרשם: תקלה לא מזוהה`);
        }
      }

    }
    catch (error) {
      console.log("catch");
      setMessage(`תקלה בתהליך הרישום: ${message2}`);
      console.log(`תקלה בתהליך הרישום ${error.message}`);

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
          Sign up
        </Typography>
        <Box component="form" onChange={handleInput2}
          // onSubmit={handleLogin}
          noValidate sx={{ mt: 1 }}>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          {errorData.name && <p className="text-pink-600 text-sm">{errorData.name}</p>}

          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="phone"
            name="phone"
            autoComplete="phone"
            autoFocus
          />
          {errorData.phone && <p className=" text-pink-600 text-sm">{errorData.phone}</p>}

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {errorData.email && <p className="text-pink-600 text-sm">{errorData.email}</p>}


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
          {errorData.username && <p className="text-pink-600 text-sm">{errorData.username}</p>}

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"

          />
          {errorData.password && <p className="text-pink-600 text-sm">{errorData.password}</p>}


          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onSubmit}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
              <Link
                onClick={() => { setIsNew(true) }}
                //  href="http://localhost:5173/home"
                variant="body2">
                Already have an account? Sign in
              </Link>

            </Grid>
          </Grid>
        </Box>
      </Box>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
