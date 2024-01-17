import React, { useState } from 'react';
import Edit from '../Modals/Edit';
import Delete from '../Modals/Delete';
import axios from 'axios';



function DreamContainer({ userName, dreamName, dreamDate, dreamDescription, dreamID}) {

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedDreamID, setSelectedDreamID] = useState(null);
    const [deleteDreamID, setDeleteDreamID] = useState(null);
    const [dream, setDream] = useState([]);

    const handleEditClick = (id) => {
        setSelectedDreamID(id)
        setShowEdit(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteDreamID(id)
        setShowDelete(true);
    };


    const handleModalSubmit = (updatedDreamData) => {
        
        setDream((prevDreams) =>
            prevDreams.map((dream) =>
                dream._id === selectedDreamID ? { ...dream, ...updatedDreamData } : dream
            )
            );
            setShowEdit(false);
        };

        const deleteFriend = (id) => {
            axios
            .delete(`http://localhost:8001/deleteDream/${id}`)
            .then((res) => {
                console.log("dream deleted");
                window.location.reload();
            })
            .catch((err) => console.log(err));
        };

    return (
        <div className='py-12 px-8 bg-container2 flex flex-col text-text rounded-lg'>
            <h1 className='mb-4 text-3xl'>{userName}</h1>
            <div className='mb-4 flex gap-4'>
                <h1>Dream Name:</h1>
                <h1>{dreamName}</h1>
            </div>
            <div className='flex gap-4'>
                <h1>Dream Date</h1>
                <h1>{dreamDate}</h1>
            </div>
            <textarea
                disabled
                rows={10}
                cols={20}
                className='p-3 mt-6 rounded-md bg-container2 border-2 border-accent focus:outline-none focus:border-secondary'
            >
                {dreamDescription}
            </textarea>
            <div className='mt-5 flex justify-end gap-4'>
                <button
                    onClick={() => setShowDelete(true)}
                    className='py-3 px-7 rounded-md bg-error font-semibold text-white hover:bg-errordark ease-in-out duration-300'
                >
                    Delete
                </button>
                <button
                    onClick={handleEditClick}
                    className='py-3 px-7 rounded-md text-background font-semibold bg-primary hover:bg-accent ease-in-out duration-300'
                >
                    Edit
                </button>
            </div>
            {showEdit &&  (
                <Edit
                    onClose = {() => setShowEdit(false)}
                    onSubmit = {handleModalSubmit}
                    dream = {{
                        DreamName: dreamName,
                        DreamDate: dreamDate,
                        DreamDescription: dreamDescription,
                    }}
                    dreamID={selectedDreamID}
                />
            )}
            {showDelete && (
                <Delete
                    onYes={() => deleteFriend()}
                    onClose={() => setShowDelete(false)} 
                />
            )}
        </div>
    );
}

export default DreamContainer;
