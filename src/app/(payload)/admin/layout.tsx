import { RootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from './serverActions'
import { importMap } from './importMap'
import React from 'react'

// Payload admin styles are automatically injected by withPayload in next.config
// No manual CSS import needed

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout
    config={import('@payload-config').then((m) => m.default)}
    importMap={importMap}
    serverFunction={handleServerFunctions}
  >
    {children}
  </RootLayout>
)

export default Layout
