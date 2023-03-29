import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import { AuthContext } from '../../../context/AuthContext';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('anu@gmail.com');
  const [password, setPassword] = useState('pass9988');
  const [message, setMessage] = useState(false)
  const [alert, setAlert] = useState(false)
  const [status, setStatus] = useState(false)

  const handleClick = async () => {
    try {
      const result = await axios.post('http://localhost:8000/users/login', { email, password });
      console.log(result);
      setUser(result.data.user);
      setMessage(result.data.message)
      setStatus("success");
      setAlert(true);
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, "1000");
      // navigate('/dashboard', { replace: true });
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
      setStatus("error");
      setAlert(true);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Имэйл" value={email} />

        <TextField
          name="password"
          label="Нууц үг"
          type={showPassword ? 'text' : 'password'}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Нууц үг санах
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Нэвтрэх
      </LoadingButton>
      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={alert}
          onClose={() => {
            setAlert(false);
          }}
          autoHideDuration={3000}
        >
          <Alert severity={status}>{message}</Alert>
        </Snackbar>
    </>
  );
}