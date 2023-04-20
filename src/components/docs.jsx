import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useDocsData = (database) => {
    const [docsData, setDocsData] = useState([]);
    useEffect(() => {
        const collectionRef = collection(database, 'docsData');
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDocsData(data);
        });
        return () => {
            unsubscribe();
        };
    }, [database]);

    return docsData;
};
export default function Docs({ database }) {
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const addData = () => {
        if (!title) {
            toast.error('Введите хоть что-то');
            return;
        }
        const collectionRef = collection(database, 'docsData');
        addDoc(collectionRef, {
            title,
            docsDesc: '',
        })
        handleClose();
    };
    const handleChildClick = (id) => {
        navigate(`/editDocs/${id}`);
    };
    const docsData = useDocsData(database);
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        }
    }, []);

    return (
        <div className="docs-main">
            <h1>DocEditr</h1>
            <button className="add-docs" onClick={handleOpen}>
                Add a Document
            </button>
            <div className={`grid-main ${docsData.length > 1 ? 'grid-main-gap' : 'grid-main'}`}>
                {docsData.map(({ id, title, docsDesc }) => (
                    <div key={id} className="grid-child" onClick={() => handleChildClick(id)}>
                        <p>{title}</p>
                        <div dangerouslySetInnerHTML={{ __html: docsDesc }} />
                    </div>
                ))}
            </div>
            <Modal open={open} setOpen={setOpen} title={title} setTitle={setTitle} addData={addData} />
            <ToastContainer />
        </div>
    );
}
