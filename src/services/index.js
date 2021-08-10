import {navigateTo} from '../../routes.js'

//FireStore
export const gettingNewUserData = (userData, nameOfUser) => {
  const usersCollection = firebase.firestore().collection('users');
  const user = {
    id: userData.user.uid,
    name: nameOfUser,
    email: userData.user.email
  };
  usersCollection.add(user);
};

//Firebase auth
export const loginOfUser = (email,password) => {
  const loginWithEmail = firebase
  .auth()
  .signInWithEmailAndPassword(email,password)
  .then((userCredential) => {
    const user = userCredential.user
    navigateTo('/feed')
    console.log('uhuuuuuu', user)
    //window.location.replace('/feed')
  })

  .catch((error) =>{
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('Email ou senha inválido');
    console.log('viiiish', errorCode, errorMessage);
  })
  return loginWithEmail
}

export const loginWithGoogle = () => {
const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    firebase.auth().signInWithPopup(provider)
    .then(result => {
       navigateTo('/feed');
        console.log(result);
    }) .catch(err =>{
        alert('Erro ao logar');
        console.log(err);
    })
    return provider
}

export const createNewAccount = (emailTwo, passwordTwo, nameOfUser) => {
   const newUser = firebase.auth().createUserWithEmailAndPassword(emailTwo, passwordTwo)
    .then((userData) => {
      gettingNewUserData(userData, nameOfUser)
      sendVerificationEmail();
      navigateTo('/login')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      // ..
    });
  return newUser
};

export const registerWithGoogle = () => {
  const providerRegister = new firebase.auth.GoogleAuthProvider();
      providerRegister.addScope('https://www.googleapis.com/auth/userinfo.email');
      firebase.auth().signInWithPopup(providerRegister)
      .then(result => {
          navigateTo('/feed');
          console.log(result);
      }) .catch(err =>{
          alert('Erro ao logar');
          console.log(err);
      })
      return providerRegister
  };

export const keepLoggedUser = (persistence) => {
    firebase.auth().setPersistence(persistence)
     .then(() => {
      const provider = new firebase.auth();
      return firebase.auth().signInWithRedirect(provider);
     })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
     });
     return keepLoggedUser
   };


  //Sign-out 
  export const logOut = () => { 
    firebase.auth().signOut().then(() => {
    navigateTo('/login') 
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  
};

//esqueci a senha

export const reset = (email) => {
  const forgotPassword = firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('E-mail enviado com sucesso!');
       })
    .catch(err =>{
      alert('Erro ao logar');
      console.log(err);
    })
      return forgotPassword
    }

    /*.catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       })*/


 /*email autentication*/  

 export const sendVerificationEmail = () => {
  
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
      console.log('Verification Email Sent Successfully !');
    
     navigateTo('/login');
  })
  .catch(error => {
      console.error(error);
  })
}



