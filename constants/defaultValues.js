/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-sub-hidden";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "th";
export const localeOptions = [
  { id: "th", name: "ไทย" },
  { id: "en", name: "English" },
];
export const completeVideoPlayPercentage = 0.9;
export const minimumVideoPlayPercentage = 0.2;

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.planforfit.com/actdev";


const dev = {
  Storage: {
    AWSS3: {
      bucket: "cdn-planforfit-com",
      region: "ap-southeast-1",
    }
  },
  Auth: {
    region: "ap-southeast-1",
    userPoolId: "ap-southeast-1_yVVf1J0zR",
    identityPoolId: "ap-southeast-1:cc1900b3-00e0-4aef-8f1b-c1c6eaa1b7a8",
    userPoolWebClientId: "2i1b1e5sag1hvc2sr008v6hpf"
  },
  API: {
    endpoints: [
      {
        name: "planforfit",
        endpoint: process.env.REACT_APP_STAGE === 'dev'
          ? "https://api.planforfit.com/course_dev"
          : "http://localhost:3003", //หรือ "http://localhost:3003" สำหรับเทสบน emulator
        region: "ap-southeast-1"
      }
    ]
  }
}

const prod = {
  Storage: {
    AWSS3: {
      bucket: "cdn-planforfit-com",
      region: "ap-southeast-1"
    }
  },
  Auth: {
    region: "ap-southeast-1",
    userPoolId: "ap-southeast-1_yVVf1J0zR",
    identityPoolId: "ap-southeast-1:cc1900b3-00e0-4aef-8f1b-c1c6eaa1b7a8",
    userPoolWebClientId: "2i1b1e5sag1hvc2sr008v6hpf"
  },
  API: {
    endpoints: [
      {
        name: "planforfit",
        endpoint: "https://api.planforfit.com/wellly_dev",
        region: "ap-southeast-1"
      }
    ]
  }
}

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : prod //หรือ dev สำหรับเทสบน emulator

export const awsConfig = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
