import { Box, Card, CardContent, Container } from "@mui/material";
import * as React from "react";
import { Title } from "../../../components/common/Title";
import { Form } from "../../../components/Form/Form";
import { useLogin } from "../hooks/useLogin";

export const Login = React.memo(function Login() {
  const { inputs, isLoading, methods, handleLogin } = useLogin();

  return (
    <Container
      sx={{
        display: "flex",
        height: "95vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <Title>Login</Title>
            <Form
              inputs={inputs}
              isLoading={isLoading}
              methods={methods}
              submitText="login"
              loadingSubmitText="login"
              onSubmit={handleLogin}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
});
