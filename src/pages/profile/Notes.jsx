import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavWrapper from "./NavWrapper";
import Button from '../../components/Button';
import { deleteEntity, getEntities } from "../../services/api";

const Notes = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  const fetchNotes = useCallback(async () => {
    const data = await getEntities('notes', { userName: user.email });
    const sorted = data.toSorted((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    setTodos(sorted);
  }, [user]);

  const handleRemoveNote = useCallback(async (id) => {
    await deleteEntity('notes', id);
    await fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (!user) {
      return;
    }
    fetchNotes();
  }, [user, fetchNotes, navigate]);

  return (
    <NavWrapper>
      <div className="flex items-center justify-center max-w-md w-full">
        <div className="p-8 bg-white rounded shadow-md w-full">
          <h1 className="text-2xl font-bold mb-4">Notes</h1>
          <Button handler={() => navigate('/notes/create')}>
            Create new note
          </Button>
          <ul className="mt-4 flex flex-col gap-2 max-h-96 overflow-y-auto">
            {todos?.map(todo => (
              <li
                key={todo.id}
                className="flex justify-between px-2 border rounded-md text-sm"
              >
                <div className="flex flex-col py-2">
                  <span>{todo.title}</span>
                  <span>{new Date(todo.createdDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button customColor="green" handler={() => navigate(`view/${todo.id}`)}>
                    View
                  </Button>
                  <Button handler={() => navigate(`/notes/edit/${todo.id}`)}>
                    Edit
                  </Button>
                  <Button handler={() => handleRemoveNote(todo.id)} customColor="red">
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </NavWrapper>
  );
};

export default Notes;