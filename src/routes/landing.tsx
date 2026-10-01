import { createFileRoute } from '@tanstack/react-router'
import { Home } from './index'

export const Route = createFileRoute('/landing')({
  head: () => ({
    meta: [
      { title: 'Rafaela Almeida | Landing page' },
      { name: 'description', content: 'Clareza financeira para crescer com segurança. BPO Financeiro, gestão estratégica e diagnóstico para pequenas e médias empresas.' },
    ],
  }),
  component: Home,
})
