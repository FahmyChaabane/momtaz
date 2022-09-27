import { GET_PROFILE_QUERY } from "./queries";
import { ParentDto } from "./interfaces";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { addApolloState, initializeApollo } from "../apollo-client";
import cookies from "next-cookies";
import { GraphQLError } from "graphql";
import { ServerError, ServerParseError } from "@apollo/client";

export const withAuthServerSideProps: (
  callback?: Function
) => GetServerSideProps =
  (callbackQuery?) => async (context: GetServerSidePropsContext) => {
    const apolloClient = initializeApollo(null);
    // console.log("is there a cookie?", cookies(context).token); // yes

    try {
      await apolloClient.query<{ getProfile: ParentDto }>({
        query: GET_PROFILE_QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${cookies(context).token}`,
          },
        },
      });
    } catch ({ graphQLErrors, networkError }) {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);

      if ((graphQLErrors as GraphQLError[]).length) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      if (networkError) {
        console.log(
          `networkError`,
          (networkError as Error | ServerParseError | ServerError | null)
            ?.message
        );
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    }

    // in case i want to execute an other query beside the conntected user check.
    if (callbackQuery) {
      const data = callbackQuery(context);
      return addApolloState(apolloClient, {
        props: { data },
      });
    }

    return addApolloState(apolloClient, {
      props: {},
    });
  };

export const secondsToHms = (d: string, format?: string) => {
  const secs = Number(d);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor((secs % 3600) % 60);
  const hDisplay =
    h > 0
      ? h + (format === "short" ? "h: " : h == 1 ? " hour, " : " hours, ")
      : "";
  const mDisplay =
    m > 0
      ? m + (format === "short" ? "min: " : m == 1 ? " minute, " : " minutes, ")
      : "";
  const sDisplay =
    s > 0
      ? s + (format === "short" ? "sec " : s == 1 ? " second" : " seconds")
      : "";

  return hDisplay + mDisplay + sDisplay;
};

export const convertDate = (inputFormat: string) => {
  const pad = (s: number) => {
    return s < 10 ? "0" + s : s;
  };
  const d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
};

export const convertTiming = (d: string) => {
  const date = new Date(d);
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  return `${h}h:${m}min:${s}s`;
};

export const convertSecMin = (input: string | number) => {
  const secs = Number(input);
  return secs / 60;
};

export const timeSince = (date: string) => {
  var seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
