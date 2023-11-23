
import { initializeApp } from "firebase/app";
import {getAuth} from"firebase/auth"

const firebaseConfig = {
  // apiKey:import.meta.env.VITE_apiKey,
  // authDomain:import.meta.env.VITE_authDomain,
  // projectId:import.meta.env.VITE_projectId,
  // storageBucket:import.meta.env.VITE_storageBucket,
  // messagingSenderId:import.meta.env.VITE_messagingSenderId,
  // appId:import.meta.env.VITE_appId

  apiKey: "AIzaSyDbd18zcC2bHfiUCf3gcnvMOReYTXTiOkw",
  authDomain: "blood-donation-7fb77.firebaseapp.com",
  projectId: "blood-donation-7fb77",
  storageBucket: "blood-donation-7fb77.appspot.com",
  messagingSenderId: "829224202003",
  appId: "1:829224202003:web:d3b52589691d567140b4e6"
};


const app = initializeApp(firebaseConfig);
const myAuth = getAuth(app)
export default myAuth