import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { ProgressProvider } from './contexts/ProgressContext'
import { VocabularyProvider } from './contexts/VocabularyContext'
import { LearningProvider } from './contexts/LearningContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProgressProvider>
        <VocabularyProvider>
          <LearningProvider>
            <App />
          </LearningProvider>
        </VocabularyProvider>
      </ProgressProvider>
    </AuthProvider>
  </StrictMode>,
)
