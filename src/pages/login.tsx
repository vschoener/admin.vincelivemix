/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { GetServerSideProps } from 'next';
import httpStatusCode from 'http-status-codes';
import { ServerResponse } from 'http';

import { EmptyProps } from '../lib/require-auth-server-side';
import { TopNav } from '../components/nav/top-nav';
import { login } from '../client/services/auth';
import { fetchUserFromCookie } from '../server/services/authentication';

type LoginForm = {
  email: string;
  password: string;
};

export default function Login(): ReactElement {
  const { register, handleSubmit, errors } = useForm();

  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoginError(null);
      await login(data);
      // mutate revalidate the cache and to the query to update user state
      // as router.push will not refresh/request the server to retrieve user login
      await mutate('/api/fetch-user');
      router.push('/');
    } catch (err) {
      // we don't really care about the error *for now*
      // We could handle 400 of course but if credential is invalid in anyway the user should put the correct info
      setLoginError('Invalid credential');
    }
  };

  return (
    <>
      <TopNav />
      <Head>
        <title>Login</title>
      </Head>
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <form className="col-6" onSubmit={handleSubmit(onSubmit)}>
            {loginError && <p className="text-danger">{loginError}</p>}
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
                ref={register({ required: true })}
              />
              {errors.email && <p className="text-danger">This field is required</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                ref={register({ required: true })}
              />
              {errors.password && <p className="text-danger">This field is required</p>}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export const redirectToHome = (res: ServerResponse): void =>
  res
    .writeHead(httpStatusCode.PERMANENT_REDIRECT, {
      Location: `/`,
    })
    .end();

export const getServerSideProps: GetServerSideProps<EmptyProps> = async ({ req, res }) => {
  const cookie = req.headers?.cookie;

  if (!cookie) {
    return { props: {} };
  }

  try {
    await fetchUserFromCookie(cookie);

    redirectToHome(res);
  } catch (err) {
    // if err like 401 we don't want to redirect
    // otherwise: TODO: log error
  }
  return { props: {} };
};
