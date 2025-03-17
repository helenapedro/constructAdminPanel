import { db, doc, getDoc, collection, getDocs } from './firebase'; 

export const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, 'category'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchOwnerData = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: documentId, ...docSnap.data() };
    } else {
        throw new Error('No such document!');
    }
};

export const fetchProjectDetails = async (projectId) => {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: projectId, ...docSnap.data() };
    } else {
        throw new Error('No such document!');
    }
};

export const updateProjectDetails = async (projectId, updatedData) => {
    const docRef = doc(db, 'projects', projectId);
    await updateDoc(docRef, updatedData);
};