import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import NavWrapper from "./NavWrapper";
import Button from '../../components/Button';
import { getEntity, deleteEntity } from "../../services/api";

const ViewNote = () => {
  const user = useSelector((state) => state.user);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  
  const handleRemoveNote = useCallback(async (id) => {
    await deleteEntity('notes', id);
    navigate('/notes');
  }, [navigate]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getEntity('notes', { id: noteId });
      setNote(data);
    };
    if (!user) {
      return;
    }
    fetchNotes();
  }, [noteId, user]);
  
  return (
    <NavWrapper>
      <div className="flex items-center justify-center max-w-md w-full">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
          {
            note.description 
              ? <pre className="text-gray-700 bg-gray-200 mb-4 p-1 rounded">
                  {note.description}
                </pre>
              : null
          }
          <div className="flex justify-between items-center">
            <Button handler={() => navigate('/notes')}>
              Back
            </Button>
            <div className="flex gap-2">
              <Button handler={() => navigate(`/notes/edit/${noteId}`)}>
                Edit
              </Button>
              <Button handler={() => handleRemoveNote(noteId)} customColor="red">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
};

export default ViewNote;