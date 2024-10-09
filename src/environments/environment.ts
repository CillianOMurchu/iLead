const firebaseConfig = {
  projectId: 'ilead-fd085',
  appId: '1:444022814318:web:c65d2f671fb89f671f987f',
  storageBucket: 'ilead-fd085.appspot.com',
  apiKey: 'AIzaSyDcZWGIM9CBOTM-NipchhxTaeFPK0tdNg8',
  authDomain: 'ilead-fd085.firebaseapp.com',
  messagingSenderId: '444022814318',
  measurementId: 'G-3X1WEPZT4B',
};

export const environment = {
  production: false,
  firebase: firebaseConfig,
  OPENAI_API_KEY: `${process.env['OPENAI_API_KEY']}`,
};
