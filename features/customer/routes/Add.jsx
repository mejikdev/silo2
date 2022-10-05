import { Box, Container } from "@mui/material";
import * as React from "react";
import { Title } from "../../../components/common/Title";
import { Form } from "../../../components/Form/Form";
import { useAdd } from "../hooks/useAdd";

export const AddCustomer = React.memo(function AddCustomer() {
  const { inputs, isLoading, methods, handleSubmit } = useAdd();

  return (
    <Container>
      <Box>
        <Title>Add Customer</Title>
        <Form
          inputs={inputs}
          isLoading={isLoading}
          methods={methods}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
});
