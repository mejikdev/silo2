import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { useGetEmployees } from "../../../api/features/employee/useGetEmployees";
import { CustomTable } from "../../../components/Table";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "departement",
    headerName: "Departement",
    flex: 1,
  },
];

export const Employee = () => {
  const router = useRouter();
  const { data } = useGetEmployees();

  const rows = React.useMemo(() => {
    if (data?.length) {
      return data;
    }

    return [];
  }, [data]);

  return (
    <Stack
      sx={{
        p: 4,
      }}
    >
      <Stack
        sx={{
          mb: 2,
        }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Employees</Typography>
        <Button
          onClick={() => {
            router.push("/employee/add");
          }}
          variant="contained"
          size="large"
        >
          Add
        </Button>
      </Stack>
      <Box sx={{ height: "527px" }}>
        <CustomTable columns={columns} rows={rows ?? []} pageSize={8} />
      </Box>
    </Stack>
  );
};
