'use client';

import { useState } from 'react';
import { Modal, Tabs, TextInput, PasswordInput, Loader } from '@mantine/core';
import GoogleAuthButton from '../buttons/GoogleAuthButton';
import { useLoginMutation, useSignupMutation } from '../../../../../packages/store/features/api/authApiSlice';



type AuthModalProps = {
  opened: boolean;
  onClose: () => void;
};

export default function AuthModal({ opened, onClose }: AuthModalProps) {
  // Local form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState(''); 

  // Mutations
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [signup, { isLoading: isSignupLoading, error: signupError }] = useSignupMutation();

  // Handle login
  const handleLogin = async () => {
    try {
      const res = await login({ email: loginEmail, password: loginPassword }).unwrap();
      console.log('Login successful:', res);
      onClose(); // Close modal on success
    } catch (err) {
      console.error('❌ Login failed:', err);
    }
  };

  // Handle signup
  const handleRegister = async () => {
    try {
      const res = await signup({
        email: registerEmail,
        password: registerPassword,
        firstName: registerFirstName,
        lastName: registerLastName,
        phone: registerPhone,
      }).unwrap();
      console.log(' Signup successful:', res);
      onClose();
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Welcome to Pivota"
      centered
      size="md"
    >
      <Tabs defaultValue="login">
        <Tabs.List grow>
          <Tabs.Tab value="login">Login</Tabs.Tab>
          <Tabs.Tab value="register">Register</Tabs.Tab>
        </Tabs.List>

        {/* ---------------- Login ---------------- */}
        <Tabs.Panel value="login" pt="md">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            mb="sm"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mb="md"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.currentTarget.value)}
          />
          <button
            onClick={handleLogin}
            disabled={isLoginLoading}
            className="bg-amber-300 hover:bg-amber-200 disabled:opacity-50 text-black text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer w-full mb-3 flex justify-center"
          >
            {isLoginLoading ? <Loader size="sm" color="dark" /> : 'Login'}
          </button>
          {loginError && <p className="text-red-500 text-sm mb-2">Login failed</p>}
          <div className="flex items-center justify-center">
            <GoogleAuthButton text="Login with Google" />
          </div>
        </Tabs.Panel>

        {/* ---------------- Register ---------------- */}
        <Tabs.Panel value="register" pt="md">
          <TextInput
            label="First Name"
            placeholder="John"
            required
            mb="sm"
            value={registerFirstName}
            onChange={(e) => setRegisterFirstName(e.currentTarget.value)}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            required
            mb="sm"
            value={registerLastName}
            onChange={(e) => setRegisterLastName(e.currentTarget.value)}
          />
          <TextInput
            label="Phone"
            placeholder="07409123456"
            required
            mb="sm"
            value={registerPhone}
            onChange={(e) => setRegisterPhone(e.currentTarget.value)}
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            mb="sm"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            required
            mb="md"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.currentTarget.value)}
          />
          <button
            onClick={handleRegister}
            disabled={isSignupLoading}
            className="bg-amber-300 hover:bg-amber-200 disabled:opacity-50 text-black text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer w-full mb-3 flex justify-center"
          >
            {isSignupLoading ? <Loader size="sm" color="dark" /> : 'Register'}
          </button>
          {signupError && <p className="text-red-500 text-sm mb-2">Registration failed</p>}
          <div className="flex items-center justify-center">
            <GoogleAuthButton text="Register with Google" />
          </div>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
