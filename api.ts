import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { getCookie, JWT_TOKEN } from "./cookie";
import { IProject, IUnderDog } from "./types";

export const instance = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});

export interface IEmailLogInVariables {
  email: string;
  password: string;
}

export interface IEmailLoginSuccess {
  ok: string;
}

export interface IEmailLoginError {
  error: string;
}

export const emailLogIn = ({ email, password }: IEmailLogInVariables) =>
  instance
    .post(`users/login`, { email, password })
    .then((response) => response.data);

interface ISignUpVariables {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export const SignUp = ({ password, email, name }: ISignUpVariables) =>
  instance
    .post(`users/`, {
      password,
      email,
      name,
    })
    .then((response) => response.data);

export const getMe = () =>
  instance
    .get(`users/me`, {
      headers: { authorization: getCookie(JWT_TOKEN) || "" },
    })
    .then((response) => response.data);

export interface IProjectsResponse {
  success: boolean;
  projects: IProject[];
}

export const getRecommended = () =>
  instance.get(`projects/recommended`).then((response) => response.data);

export const getProjects = () =>
  instance.get(`projects/`).then((response) => response.data);

export const getCategories = () =>
  instance.get("/category").then((res) => res.data);

interface IUnderdogResponse {
  success: boolean;
  underdog: IUnderDog;
}

export const getUnderdog = ({
  queryKey,
}: QueryFunctionContext): Promise<IUnderdogResponse> =>
  instance.get(`/underdogs/${queryKey[1]}`).then((res) => res.data);

interface ICreateUnderdogVariables {
  name: string;
  members: string;
  experiences: string;
  scenario: string;
  ability: string;
  bio: string;
}

export const createUnderdog = ({
  name,
  members,
  experiences,
  scenario,
  ability,
  bio,
}: ICreateUnderdogVariables) =>
  instance
    .post(
      "/underdogs",
      {
        name,
        members,
        experiences,
        scenario,
        ability,
        bio,
      },
      {
        headers: { authorization: getCookie(JWT_TOKEN) || "" },
      }
    )
    .then((res) => res.data);

interface ICreateProjectVariables {
  title: string;
  detail: string;
  goal_amount: number;
  categoryId: number;
}

export const createProject = ({
  title,
  detail,
  goal_amount,
  categoryId,
}: ICreateProjectVariables) =>
  instance
    .post(
      "/projects",
      {
        title,
        detail,
        goal_amount,
        categoryId,
      },
      {
        headers: { authorization: getCookie(JWT_TOKEN) || "" },
      }
    )
    .then((res) => res.data);
