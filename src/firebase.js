import {initializeApp} from "firebase/app";
import {getFirestore}  from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyCZKFUYtTcq95qipQ93trr6phi3QL4euQE",
  
    authDomain: "covid-19-tracker-61143.firebaseapp.com",
  
    projectId: "covid-19-tracker-61143",
  
    storageBucket: "covid-19-tracker-61143.appspot.com",
  
    messagingSenderId: "249944071756",
  
    appId: "1:249944071756:web:ee35fe90fb0174e8cf5ee9",
  
    measurementId: "G-8B2P9RG3B5"
  
  };

   initializeApp(firebaseConfig);
   const db=getFirestore();

  export default db;