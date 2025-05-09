'use client';

import { useState, useEffect } from 'react';
import { TypographyH1 } from '../_components/typography/h1';
import { TypographyP } from '../_components/typography/p';
import { Input } from '../_components/form/input';
import { FormField } from '../_components/form/formField';
import { ErrorMessage } from '../_components/error/message';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // バリデーション関数
  const validateEmail = (email: string) => {
    if (!email) return 'メールアドレスを入力してください';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? '' : '有効なメールアドレスを入力してください';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'パスワードを入力してください';
    return password.length >= 8 ? '' : 'パスワードは8文字以上で入力してください';
  };

  // 入力時のバリデーション
  useEffect(() => {
    if (email) setEmailError(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (password) setPasswordError(validatePassword(password));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // フォーム送信時のバリデーション
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    setEmailError(emailValidationResult);
    setPasswordError(passwordValidationResult);

    if (emailValidationResult || passwordValidationResult) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('ログインに成功しました');
        // ログイン成功後の処理をここに追加
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      alert('サーバーとの通信に失敗しました');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#94A3AB]">
      <div className="z-20 w-full max-w-md mx-auto">
        <TypographyH1 className="text-5xl font-medium tracking-normal w-full mb-2 text-center">
          Book Management
        </TypographyH1>
        <TypographyP className="text-center tracking-widest text-gray-300 mb-5">
          FOR
        </TypographyP>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField id="email" label="Email">
            <Input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorMessage
              errorMessage={emailError}
              isOpen={emailError !== ''}
            />
          </FormField>

          <FormField id="password" label="Password">
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage
              errorMessage={passwordError}
              isOpen={passwordError !== ''}
            />
          </FormField>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-[#0D7EA5] py-4 px-6 text-center font-medium text-white hover:bg-[#0a6a8a]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}