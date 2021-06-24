import { storage } from '../instance/Firebase';

export const uploadImage = (img, userId) => {
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('images');
    const userRef = imagesRef.child(userId);
    const avatarRef = userRef.child("avatar");
    avatarRef.putString(img, 'data_url').then(snapshot => {
        console.log("done", snapshot)
    })
}

export const downloadImage = (userId, setImg) => {
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('images');
    const userRef = imagesRef.child(userId);
    const avatarRef = userRef.child("avatar");
    avatarRef.getDownloadURL().then(url => {
        setImg(url)
    })
}

export const deleteImage = (userId) => {
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('images');
    const userRef = imagesRef.child(userId);
    const avatarRef = userRef.child("avatar");
    avatarRef.delete().then(() => {

    })
}