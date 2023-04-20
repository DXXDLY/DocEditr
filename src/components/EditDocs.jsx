import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateDoc, collection, doc, onSnapshot } from 'firebase/firestore';

export default function EditDocs({ database }) {
    const [documentTitle, setDocumentTitle] = useState('');
    const [docsDesc, setDocsDesc] = useState('');
    const params = useParams();
    const collectionRef = collection(database, 'docsData');
    const isMounted = useRef(false);

    const getQuillData = (value) => {
        setDocsDesc(value);
    };

    useEffect(() => {
        // Обновление данных через определенное время после того, как пользователь остановил печатать
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id);
            updateDoc(document, {
                docsDesc: docsDesc,
            })
                .then(() => {
                    alert('Document Saved')
                })
                .catch(() => {
                    alert('Cannot Save Document')
                });
        }, 1500);

        return () => clearTimeout(updateDocsData);
    }, [docsDesc, collectionRef, params.id]);

    useEffect(() => {
        if (!isMounted.current) {
            // Получение данных документа только один раз
            const document = doc(collectionRef, params.id);
            onSnapshot(document, (docs) => {
                setDocumentTitle(docs.data().title);
                setDocsDesc(docs.data().docsDesc);
            });
            isMounted.current = true;
        }
    }, [collectionRef, params.id]);
    console.log(toast)


    const handleSaveToFile = () => {
        const contentWithoutTags = docsDesc.replace(/<[^>]*>/g, '');
        const blob = new Blob([contentWithoutTags], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'document.txt';
        link.href = url;
        link.click();
    };

    const handleLoadFromFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                setDocsDesc(fileContent);
            };
            reader.readAsText(file);
        }
    };


    return (
        <div className='editDocs-main'>
            <ToastContainer />
            <h1>{documentTitle}</h1>
            <button onClick={handleSaveToFile} className='saveBtn'>Save as txt</button>
            <div className='loadText'>
                <input type='file' accept='.txt' onChange={handleLoadFromFile} />
            </div>
            <div className='editDocs-inner'>
                <ReactQuill
                    className='react-quill'
                    value={docsDesc}
                    onChange={getQuillData}
                />
            </div>
            
        </div>
    );
}