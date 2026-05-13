import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Mailman',
    description: 'Transform your Gmail into a calm, organized, stack-based email workspace.',
    version: '1.0.0',
    key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvHeUa+mmiL7gqJOV26KVLfcvP6WADW0sD1a/aMIRFAwhDM6vI8HNtnZB21zLf5v66sN02zI+Tgi4d69yVPg5sYiybL4jia27FjrLEK7ugLtz0Xbo9b5H1dJXsgmagydL4jj0fEQyrPgC9uc3+feozozzEco3bECq4uPqYcQh5OXbg9k3rEpZ+CKVPmW0a3rZuBPJ2HutIFWGd4F5z6+fznCxPG1o8qB5d1FuTJW5Yg3A9fY/nauWh4QFG/3+qG8rsfnnZgnqI2wpeTSYBnrKtxlBwL5uzncgv7M7qoglYNzefkgbasUAeJ3ZwLvdYWfr+VlnPe+5vabb3IMBcpJq0wIDAQAB',
    permissions: ['identity', 'storage', 'activeTab', 'tabs'],
    host_permissions: ['https://mail.google.com/*'],
    oauth2: {
      client_id: '1006815105102-11rtdk2o3cdd3tn4g0l6eis1442d3gfo.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    },
    icons: {
      16: '/icons/icon-16.png',
      32: '/icons/icon-32.png',
      48: '/icons/icon-48.png',
      128: '/icons/icon-128.png',
    },
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
