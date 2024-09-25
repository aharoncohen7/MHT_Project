import React, { useState, useContext } from 'react';
import UserContext from '../../contexts';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from 'yup';

export default function Register({ setIsExists }) {
  const { setMessage, message } = useContext(UserContext)

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


  const handleInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

// סכמה של מבנה השדות
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

// בשליחת הטופס
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

  //Registration 
  const handleRegister = async () => {
    try {
      const response = await fetch('https://vortly-db.onrender.com/api/registration', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 400 || response.status === 404) {
        console.log("400");
        const errorMessage = await response.text();
        setMessage([`${errorMessage} :תקלה בתהליך הרישום `,false])
        console.log(errorMessage);
      }
      if (response.status === 200) {
        const user = await response.json();
        console.log(user);
        if (user) {
          setMessage(["נרשמת! קישור לאימות כתובת האימייל נשלח אליך, נא לאשר אותו", true]);
          window.location.href = "https://vortly.onrender.com/"
        }
        else {
          // console.log("try > else");
          console.log('משתמש נרשם: תקלה לא מזוהה', response);
          setMessage([`משתמש נרשם: תקלה לא מזוהה`, false]);
        }
      }

    }
    catch (error) {
      console.log("catch");
      setMessage([`${error.message} תקלה בתהליך הרישום`, false]  );
      console.log(`תקלה בתהליך הרישום ${error.message}`);

    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: 360
        }}
      >
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <Box className='text-right' component="form" onChange={handleInput}
          // onSubmit={handleLogin}
          noValidate sx={{ mt: 1 }}>

          <TextField
          
            margin="normal"
            required
            fullWidth
            id="name"
            label="שם מלא"
            name="name"
            autoComplete="name"
            style={{direction: "rtl"}}
            autoFocus
          />
          {errorData.name && <p className="text-pink-600 text-sm">{errorData.name}</p>}

          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="מספר טלפון"
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
            label="אימייל"
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
            label="שם משתמש"
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
            label="סיסמה"
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
            שלח טופס
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
                onClick={() => { setIsExists(true) }}
                //  href="https://vortly.onrender.com/"
                variant="body2">
                כבר יש לך חשבון ? הכנס
              </Link>

            </Grid>
          </Grid>
        </Box>
      </Box>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
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