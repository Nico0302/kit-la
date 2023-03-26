import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Logo from '@components/logo'

const config: DocsThemeConfig = {
  logo: <><Logo/><strong>Lineare Algebra</strong></>,
  footer: {
    text: '© 2023 - Nicolas',
  },
  search: {
    placeholder: 'Suchen ...',
  },
  feedback: {
    content: null
  },
  editLink: {
    component: null
  },
  toc: {
    title: 'Inhalt'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – LA1'
    }
  }
}

export default config
