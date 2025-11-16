 
import {Card, CardBody, CardFooter, CardHeader, Heading, Text, Divider, Button, Input, Textarea} from '@chakra-ui/react'
import moment from "moment/moment";
import {useState} from 'react';
import { deleteNote, updateNote } from '../services/notes';

export default function Note({id, title, description, createdAt}){

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleDelete = async () => {
    if (window.confirm("Вы уверены что хотите удалить эту заметку?")){
      await deleteNote(id);
      window.location.reload();
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(title);
    setEditDescription(description);
  }

  const handleSave = async () => {
    await updateNote(id, {
      title: editTitle,
      description: editDescription
    });

    setIsEditing(false);
    window.location.reload();
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditDescription(description);
  }

  if (isEditing) {
        return (
            <Card variant={"filled"}  className="w-full">
                <div className="p-4 flex flex-col gap-3">
                    <h3 className="font-bold text-xl text-center">Редактирование заметки</h3>
                    
                    <Input 
                        placeholder="Название"
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    
                    <Textarea 
                        placeholder="Описание"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />
                    
                    <div className="flex gap-2">
                        <Button colorScheme='green' onClick={handleSave}>
                            Сохранить
                        </Button>
                        <Button colorScheme="gray" onClick={handleCancel}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </Card>
        );
  }

    return (
        <Card variant={"filled"}>
            <CardHeader>
              <Heading size={"md"}>{title}</Heading>
            </CardHeader>
            <Divider borderColor={"grey"}></Divider>
            <CardBody>
              <Text>{description}</Text>
            </CardBody>
            <Divider borderColor={"grey"}></Divider>
            <CardFooter className="flex justify-between items-center">{moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}
               <div className="flex gap-2">
                    <Button colorScheme='blue' size="sm" onClick={handleEdit}>
                        Редактировать
                    </Button>
                    <Button colorScheme='red' size="sm" onClick={handleDelete}>
                        Удалить
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
 }