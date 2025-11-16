import {Input, Textarea, Button, FormControl, FormLabel} from "@chakra-ui/react"
import { useEffect, useState } from 'react'

export default function CreateNoteForm({onCreate}) {

  const [note, setNote] = useState({ title: '', description: '', dueDate: ''});

  const onSubmit = (e) => {
    e.preventDefault();

    const noteToSend = {
      title: note.title,
      description: note.description,
      dueDate: note.dueDate ? note.dueDate + ':00Z' : null // формат для .NET
    };

    console.log('Отправляем данные:', noteToSend);
    
    onCreate(noteToSend);

    setNote({ title: '', description: '', dueDate: ''});
  }

  return (
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">
        <h3 className="font-bold text-xl">Создание заметки</h3>
        <Input placeholder="Название"
               value={note?.title ?? ""} 
               onChange={(e) => setNote({...note, title: e.target.value})}
        ></Input>
        <Textarea placeholder="Описание" 
                  value={note?.description ?? ""}
                  onChange={(e) => setNote({...note, description: e.target.value})}
        ></Textarea>
        <FormControl>
          <Input 
            type="datetime-local"
            value={note.dueDate}
            onChange={(e) => setNote({...note, dueDate: e.target.value})}
          />
        </FormControl>
        <Button type="submit" colorScheme='teal'>Создать</Button>
      </form>
  );
}