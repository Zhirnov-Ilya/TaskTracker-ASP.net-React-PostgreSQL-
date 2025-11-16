import { useEffect, useState } from 'react'
import './App.css'
import { Button, Divider, Input, Textarea, Select} from '@chakra-ui/react'
import CreateNoteForm from './components/CreateNoteForm';
import Note from './components/Note';
import Filters from "./components/Filters";
import { fetchNotes } from "./services/notes";
import { createNote} from "./services/notes";

function App() {

  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc",
  });

   useEffect(() => {
       const fetchData = async () => {
           try {
               let notes = await fetchNotes(filter);
               console.log(filter.sortOrder);
               console.log(notes);
               setNotes(notes || []); 
           } catch (error) {
               console.error('Ошибка при получении заметок:', error);
               setNotes([]); 
           }
       };

       fetchData();
   }, [filter]);

   const onCreate = async (note) => {
    await createNote(note);
    let notes = await fetchNotes(filter);
    setNotes(notes || []);
   }

  return (
  <section className="p-8 flex flex-row justify-start items-start gap-12 min-h-screen w-screen">
    <div className="flex flex-col gap-10 w-1/3">
      <CreateNoteForm onCreate={onCreate}/>
      <Filters filter={filter} setFilter={setFilter}/>
    </div>
      <ul className="flex flex-col gap-5 w-1/2">
        {notes.map( n => (
          <li key={n.id}>
          <Note id = {n.id} 
                title={n.title} 
                description={n.description} 
                createdAt={n.createdAt}/>
        </li>
        ))}
      </ul>
  </section>);
}

export default App;
