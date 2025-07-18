'use client';

import { TextInput, Textarea, Button } from '@mantine/core';

export default function ContactPage() {
  return (
    <main className="max-w-screen-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Contact Us</h1>
      <form className="space-y-4">
        <TextInput label="Name" placeholder="Your name" required />
        <TextInput label="Email" placeholder="you@example.com" type="email" required />
        <Textarea label="Message" placeholder="Tell us what's on your mind..." required minRows={4} />
        <Button type="submit" className="bg-amber-300 text-black hover:bg-amber-200">
          Send Message
        </Button>
      </form>
    </main>
  );
}
