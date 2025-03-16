import { getDoc, getDocs, collection, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";

const useData = (collectionName, id = null) => {
  const [data, setData] = useState(id ? null : []); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (id) {
          // Fetch a single document
          const docRef = doc(db, collectionName, id);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData({ id: docSnap.id, ...docSnap.data() });
          } else {
            throw new Error("Document not found");
          }

        } else {
          // Fetch all documents in the collection
          const snapshot = await getDocs(collection(db, collectionName));

          const docs = snapshot.docs.map((doc) => ({
            id: doc.id, // Include document ID
            ...doc.data(),
          }));

          setData(docs);
        }
        
      } catch (err) {
        console.error(`Error fetching data from ${collectionName}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, id]);

  const updateData = useCallback(async (updateId, newData) => {
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, collectionName, updateId);
      await updateDoc(docRef, newData);
      if (id) {
        setData((prevData) => ({ ...prevData, ...newData }));
      } else {
        setData((prevData) =>
          prevData.map((item) => (item.id === updateId ? { ...item, ...newData } : item))
        );
      }
    } catch (err) {
      console.error(`Error updating document in ${collectionName}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [collectionName, id]);

  const deleteData = useCallback(async (deleteId) => {
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, collectionName, deleteId);
      await deleteDoc(docRef);
      if (id) {
        setData(null);
      } else {
        setData((prevData) => prevData.filter((item) => item.id !== deleteId));
      }
    } catch (err) {
      console.error(`Error deleting document from ${collectionName}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [collectionName, id]);

  return { data, loading, error, updateData, deleteData };
};

export default useData;
