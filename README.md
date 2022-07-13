### React website with firebase
1. Set your firebase, and obtain the firebaseConfig values. <br />
2. Replace these values in the firebase-config.js file with your values. <br />
```
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
```
3. Allow both sign in with email and password in authentication, and allow storage <br />
4. On authentication, add user with email and password.<br >
5. Create a collection in the firestore called 'allusers' with the attributes 'email' for the authenticated user above, and 'role' set as 'staff' <br />
6. This is the user who will login to manage system users.

#### To run the project 
1. Install node <br />
Download the Node.js pre-built installer for your platform from <br />
https://nodejs.org/en/download/ if not already installed <br />

2. Open the source code folder from the command prompt <br />
```
cd Lexo-Management-main
```
3. install the dependencies <br />
```
npm install 
```
4. run the program <br />
```
npm start
```

To see the website, https://creative-blini-ab1266.netlify.app/
<details>
  <summary><u>Access the website </u>(<i>click to expand</i>)</summary>
    <h4>Admin credentials</h4>
    <code>
      email: admin@gmail.com <br />
      pass: admin45
    </code>
</details>
