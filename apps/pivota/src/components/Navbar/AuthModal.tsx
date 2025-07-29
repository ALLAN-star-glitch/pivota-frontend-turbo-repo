'use client';

import { Modal, Tabs, TextInput, PasswordInput } from '@mantine/core';
import { FcGoogle } from 'react-icons/fc';
import GoogleAuthButton from '../buttons/GoogleAuthButton';

type AuthModalProps = {
  opened: boolean;
  onClose: () => void;
};

export default function AuthModal({ opened, onClose }: AuthModalProps) {
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

        <Tabs.Panel value="login" pt="md">
          <TextInput label="Email" placeholder="you@example.com" required mb="sm" />
          <PasswordInput label="Password" placeholder="Your password" required mb="md" />
          <button
            onClick={onClose}
            className="bg-amber-300 hover:bg-amber-200 text-black text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer w-full mb-3"
          >
            Login
          </button>
          <div className="flex items-center justify-center">
              <GoogleAuthButton text="Login with Google"/>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="register" pt="md">
          <TextInput label="Full Name" placeholder="John Doe" required mb="sm" />
          <TextInput label="Email" placeholder="you@example.com" required mb="sm" />
          <PasswordInput label="Password" placeholder="Create a password" required mb="md" />
          <button
            onClick={onClose}
            className="bg-amber-300 hover:bg-amber-200 text-black text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer w-full mb-3"
          >
            Register
          </button>
          <div className="flex items-center justify-center">
              <GoogleAuthButton text="Register with Google" />
          </div>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
