import { Fragment } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { MouseSmooth } from "react-mouse-smooth";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import necessary parts from React Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // For dev tools
import routes from "configs/routes";
import dayjs from "dayjs";
import format from "dayjs/plugin/customParseFormat";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

dayjs.extend(format);

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App(): JSX.Element {
  MouseSmooth({});

  return (
    <Fragment>
      {/* Wrap the app with QueryClientProvider to use React Query */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ToastContainer stacked />

        {/* Enable ReactQueryDevtools in development */}
        <ReactQueryDevtools
          client={queryClient}
          initialIsOpen={false}
          position="right"
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
      <SpeedInsights />
    </Fragment>
  );
}

export default App;
