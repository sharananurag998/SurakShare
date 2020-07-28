import ScanbotSDK from 'react-native-scanbot-sdk';

async function initializeSDK() {
    const myLicenseKey =  
    "JQFztZhOMPl2to9Fz2P43KLbcQ59yG" +
    "3gjG6Ma7cVlFZss0DRevhIMyq8+25I" +
    "sInu6C2/fgeamGv2WVmKq7qas6nxSP" +
    "DDTLCcRrDPfSLfECm0FJEaacvhugyn" +
    "oPJSzS9JR72vABnOGZE5+QNP9VAzb2" +
    "P1mm6nhRqPgvBvnUI3qX0nZ/+QaHAl" +
    "FtJDhGeDIC0vFxmQhODvy5d1GoYO+c" +
    "FctwzLq3KMOzxpeK7yES+e0BohKFVI" +
    "2VQSnmlDL8BsuqO90m++UMK0E6GSo+" +
    "qER1Onj2VxA1WGkQAb10qoLbWvExry" +
    "0DiktKPaXIMT3gKueyIuvguHNwfR3p" +
    "mZYzWlnsppqg==\nU2NhbmJvdFNESw" +
    "pjb20uc3VyYWtzaGFyZQoxNTk3NTM1" +
    "OTk5CjU5MAoz\n";
  
  const options = {
    licenseKey: myLicenseKey, // Optional license key (empty for trial mode)
    loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
    storageImageFormat: 'JPG', // Optional image format - JPG or PNG. Default is JPG.
    storageImageQuality: 80, // Optional image JPG quality. Default is 80.
    storageBaseDirectory: myCustomStoragePath(), // Optional custom storage path.
    // The new and improved ML-based document detection is available from 
    // ScanbotSDK react-native 4.1.0 and requires iOS 11.2:
    documentDetectorMode: 'ML_BASED'
  };
  try {
    const result = await ScanbotSDK.initializeSDK(options);
    // initialization succeeded
  } catch (err) {
    // initialization failed
  }
}