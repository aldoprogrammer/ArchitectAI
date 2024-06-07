import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Logo from '../assets/ArchitectAI.png';
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleMetamaskLogin = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('Connected account:', account);
        // Handle account login logic here
        // Assuming login is successful, redirect to the dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('User rejected the request:', error);
        setErrorMessage('Metamask login failed. Please try again.');
      }
    } else {
      setErrorMessage('Please install Metamask to use this feature.');
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-auto">
      <img src={Logo} alt="Logo" className="w-52 h-52" />
      <Card color="white" shadow={true} className="w-2/5 mx-auto p-5 flex items-center justify-center h-4/5">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6 items-start">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Link to='/dashboard'>
            <Button className="mt-6" fullWidth>
              Sign In
            </Button>
          </Link>
          <Button 
            className="mt-3 bg-yellow-900 hover:bg-gradient-to-r text-white font-bold duration-300 ease-out px-4 rounded w-full py-3"
            onClick={handleMetamaskLogin}
          >
            Connect with Metamask
          </Button>
          {errorMessage && (
            <Typography color="red" className="mt-4 text-center font-normal">
              {errorMessage}
            </Typography>
          )}
        </form>
      </Card>
    </div>
  );
}
