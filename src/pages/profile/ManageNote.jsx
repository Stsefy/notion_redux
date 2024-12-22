import { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavWrapper from './NavWrapper';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { getEntity, postEntity, putEntity } from '../../services/api';

const ManageNote = ({ edit = false }) => {
  const user = useSelector((state) => state.user);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const labels = useMemo(() => {
    return {
      title: edit ? 'Edit Note' : 'Add Note',
      button: edit ? 'Save Note' : 'Add Note',
    };
  }, [edit]);

  const handleTitleChange = (e) => {
    setError('');
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setError('');
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title?.trim() === '') {
      setError('Title must be not empty.');
      setTitle('');
      return;
    }
    
    if (edit) {
      const oldEntity = await getEntity('notes', { id: noteId });
      const updatedNote = {
        ...oldEntity,
        title,
        description,
      };
      await putEntity('notes', updatedNote, noteId);
    } else {
      const newNote = {
        title,
        description,
        createdDate: Date.now(),
        userName: user.email,
      };
      await postEntity('notes', newNote);
    }

    setTitle('');
    setDescription('');

    navigate('/notes');
  };

  const fetchNote = useCallback(async () => {
    const entity = await getEntity('notes', { id: noteId });
    setTitle(entity?.title);
    setDescription(entity?.description);
  }, [noteId]);

  useEffect(() => {
    if (edit) {
      fetchNote();
    }
  }, [edit, fetchNote]);

  return (
    <NavWrapper>
      <div className="flex items-center justify-center max-w-md w-full">
        <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">{labels.title}</h1>
          <Input
            type="text"
            label="Title"
            value={title}
            handler={handleTitleChange}
          />
          {error && <p className="mb-2 block text-sm font-medium text-red-600">{error}</p>}
          <Input
            textarea
            label="Description"
            value={description}
            handler={handleDescriptionChange}
          />
          <div className="flex justify-between">
            <Button handler={() => navigate('/notes')}>
              Back
            </Button>
            <Button customColor="green" type="submit">{labels.button}</Button>
          </div>
        </form>
      </div>
    </NavWrapper>
  );
};

export default ManageNote;