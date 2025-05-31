
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: '011202',
  appName: 'Forge Mobile - Startup Idea Vault',
  webDir: 'dist',
  server: {
    url: '',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#4F46E5',
      showSpinner: false
    }
  }
};

export default config;
