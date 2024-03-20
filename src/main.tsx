import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import QueryProvider, { AxiosInterceptor, ErrorBoundry } from 'services';

import SessionProvider from 'context/session/_SessionProvider.tsx';

import 'assets/tailwind/index.css';

import App from './App.tsx';

dayjs.extend(localizedFormat);
ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Legend,
  Tooltip
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <ErrorBoundry>
      <BrowserRouter>
        <SessionProvider>
          <AxiosInterceptor>
            <App />
          </AxiosInterceptor>
        </SessionProvider>
      </BrowserRouter>
    </ErrorBoundry>
  </QueryProvider>
);
