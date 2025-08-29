import { Fragment } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { MouseSmooth } from "react-mouse-smooth";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import necessary parts from React Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import routes from "configs/routes";
import dayjs from "dayjs";
import format from "dayjs/plugin/customParseFormat";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

dayjs.extend(format);

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App(): JSX.Element {
  try {
    const pointerFine = window.matchMedia('(pointer: fine)').matches;
    const largeScreen = window.matchMedia('(min-width: 1024px)').matches;
    if (pointerFine && largeScreen) {
      MouseSmooth({});
    }
  } catch {}

  return (
    <Fragment>
      {/* Wrap the app with QueryClientProvider to use React Query */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ToastContainer stacked />

        {/* Enable ReactQueryDevtools only in development */}
        {import.meta.env.MODE === 'development' ? (
          <ReactQueryDevtools
            client={queryClient}
            initialIsOpen={false}
            position="right"
            buttonPosition="bottom-right"
          />
        ) : null}
      </QueryClientProvider>
      <SpeedInsights />
      <Analytics />
    </Fragment>
  );
}

export default App;
