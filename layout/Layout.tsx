import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

type Props = React.PropsWithChildren<{
  title?: string;
}>;

export const Layout = ({ children, title }: Props) => {
  const pageTitle = title ? `${title}` : "My App";
  const router = useRouter();

  const selectedRoute = router.pathname.split("/")[1];

  console.log(selectedRoute);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Stack
        sx={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <AppBar
          sx={{
            background: "white",
          }}
          position="static"
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Button
                sx={() => ({
                  textTransform: "none",
                  color: selectedRoute === "employee" ? undefined : "black",
                })}
                size="large"
              >
                Employees
              </Button>
            </Box>
            <Button variant="contained">Logout</Button>
          </Toolbar>
        </AppBar>
        <Stack sx={{ overflow: "auto" }}>{children}</Stack>
      </Stack>
    </>
  );
};
