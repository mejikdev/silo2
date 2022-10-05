import { useRouter } from "next/router";
import React from "react";
import { Login } from "../features/auth";

export default function Home({ token }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    router.replace("/employee");
  }, [router, token]);

  if (loading) {
    return <></>;
  }

  return <Login />;
}

Home.getInitialProps = ({ req }) => {
  const token = req.cookies["token"];

  return {
    token,
  };
};
