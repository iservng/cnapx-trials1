
import { CnapxApplication } from './config/config.js';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyCrfKDEJg8Y9Xn4B2yAWdbuMoQUvP_qk5U",
    authDomain: "cnapx-5a1c0.firebaseapp.com",
    projectId: "cnapx-5a1c0",
    storageBucket: "cnapx-5a1c0.appspot.com",
    messagingSenderId: "358469353004",
    appId: "1:358469353004:web:33b7cfc71ce29c09d89b89"
  };
initializeApp(firebaseConfig);



let urlobject = new URL(window.location.href);
let path = urlobject.pathname;

if(path.indexOf('admin') > -1)
{
  const cnapx = new CnapxApplication();
  cnapx.displayAppAdmin();  
}
else 
{
  const cnapx = new CnapxApplication();
  cnapx.displayApp();
}





 


