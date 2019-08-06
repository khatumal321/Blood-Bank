firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    //   var displayName = user.displayName;
    //   var email = user.email;
    //   var emailVerified = user.emailVerified;
    //   var photoURL = user.photoURL;
    //   var isAnonymous = user.isAnonymous;
    //   var uid = user.uid;
    //   var providerData = user.providerData;
      // ...
      window.location.href = "home.html";
    } else {
      // User is signed out.
      // ...
      window.location.href = "login.html";
    }
  });

  window.addEventListener('load', async e => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('pwa.js')
            .then(async(registration) => {
                const permission = await window.Notification.requestPermission();
                if(permission !== 'granted') {
                    throw new Error('permission not granted for Notification');
                }
                const title = 'Icon Notification';
                const options = {
                  icon: '/images/demos/icon-512x512.png'
                };
                registration.showNotification(title, options);
                console.log('servicew worker register');
            })
    }
})