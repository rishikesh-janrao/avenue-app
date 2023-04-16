import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.avenueapp.com',
  appName: 'Avenue Packaging',
  webDir: 'out',
  bundledWebRuntime: false,
  server:{
    allowNavigation:[
      "*"
    ]
  }
};

export default config;
