import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Logo from '@components/logo'

const config: DocsThemeConfig = {
  logo: <><Logo/><strong>Lineare Algebra</strong></>,
  footer: {
    text: 'Erstellt von Nicolas Gres',
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
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  head: (
    <>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – LA1',
      description: 'Mitschriften zu LA1',
      openGraph: {
          type: 'website',
          locale: 'de_DE',
          url: 'https://la-kit.vercel.app/',
          siteName: 'LA1',
      }
    }
  }
}

export default config
