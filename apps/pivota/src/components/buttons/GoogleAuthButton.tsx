'use client';

import { FcGoogle } from 'react-icons/fc';

type GoogleAuthButtonProps = {
  text?: string;
  onClick?: () => void;
};

export default function GoogleAuthButton({
  text = 'Continue with Google',
  onClick,
}: GoogleAuthButtonProps) {
  return (
    <button
      onClick={onClick || (() => alert(text))}
      className="flex items-center gap-2 border border-gray-300 text-sm px-4 py-2 rounded-full w-full justify-center hover:bg-gray-50 transition cursor-pointer"
    >
      <FcGoogle className="text-xl" />
      {text}
    </button>
  );
}
