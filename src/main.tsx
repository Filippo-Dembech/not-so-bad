import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles.css";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import zenGreenTheme from './materialTheme.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { DaysProvider } from './context/DaysContext.tsx';
import { QuestionsProvider } from './context/QuestionsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={zenGreenTheme}>
      <CssBaseline />
      <LanguageProvider>
        <QuestionsProvider>
          <DaysProvider>
            <App />
          </DaysProvider>
        </QuestionsProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
