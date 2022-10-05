import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as React from "react";

type Props = React.PropsWithChildren<Record<string, unknown>>;

export const QueryProvider = ({ children }: Props) => {
  const queryClient = React.useRef(
    new QueryClient({
      queryCache: new QueryCache({}),
      mutationCache: new MutationCache({}),
    })
  );
  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
    </QueryClientProvider>
  );
};
