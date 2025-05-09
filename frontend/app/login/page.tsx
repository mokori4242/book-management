'use client';

import { useState } from 'react';
import { TypographyH1 } from '../_components/typography/h1';
import { TypographyP } from '../_components/typography/p';
import { Input } from '../_components/form/input';
import { FormField } from '../_components/form/formField';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここに認証ロジックを実装
    console.log('ログイン処理', { username, password });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#94A3AB]">
      <div className="z-20 w-full max-w-md mx-auto">
        {/* タイトル */}
        <TypographyH1 className="text-5xl font-medium tracking-normal w-full mb-2 text-center">
          Book Management
        </TypographyH1>
        {/* 色変わらん😭 */}
        <TypographyP className="text-center tracking-widest decoration-slate-500 mb-5">
          FOR
        </TypographyP>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ユーザー名入力 */}
          <FormField id="username" label="Username">
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormField>

          {/* パスワード入力 */}
          <FormField id="password" label="Password">
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>

          {/* ログインボタン */}
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