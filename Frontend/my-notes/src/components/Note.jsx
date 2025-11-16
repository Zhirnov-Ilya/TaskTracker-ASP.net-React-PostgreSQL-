 
import {Card, CardBody, CardFooter, CardHeader, Heading, Text, Divider, Button, Input, Textarea, Checkbox, Badge} from '@chakra-ui/react'
import moment from "moment/moment";
import {useState} from 'react';
import { deleteNote, updateNote, toggleNoteCompletion } from '../services/notes';

export default function Note({id, title, description, createdAt, dueDate, isCompleted, }){

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editDueDate, setEditDueDate] = useState(dueDate);

  const handleDelete = async () => {
    if (window.confirm("Вы уверены что хотите удалить эту заметку?")){
      await deleteNote(id);
      window.location.reload();
    }
  }

  const handleToggleComplete = async () => {
    try {
      await toggleNoteCompletion(id); 
      window.location.reload();
    } catch (error) {
      console.error(error);
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
      description: editDescription,
      dueDate: editDueDate
    });

    setIsEditing(false);
    window.location.reload();
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditDescription(description);
    setEditDueDate(dueDate);
  }

  const getDueDateStatus = () => {
  if (!dueDate) return null; 
  
  const now = new Date();
  const due = new Date(dueDate);
  const timeDiff = due - now;
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  
  if (hoursDiff < 0) return 'overdue';    // просрочено
  if (hoursDiff < 24) return 'urgent';    // срочно (менее 24 часов)
  return 'normal';                        // нормально
 };

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
                    
                     <div>
                      <Input 
                        type="datetime-local"
                        value={editDueDate ? moment(editDueDate).format('YYYY-MM-DDTHH:mm') : ''}
                        onChange={(e) => {
                        if (e.target.value) {
                          const newDate = new Date(e.target.value).toISOString();
                          setEditDueDate(newDate);
                        } else {
                          setEditDueDate(null); 
                        }
                      }}
                    />
                    </div>

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
          <Card variant={"filled"} className="w-full">
           <div className={`
            ${isCompleted ? 'opacity-70 bg-green-50' : ''}
            ${!isCompleted && getDueDateStatus() === 'overdue' ? 'border-l-4 border-red-500' : ''}
            ${!isCompleted && getDueDateStatus() === 'urgent' ? 'border-l-4 border-orange-500' : ''}
          `}>
            <CardHeader>
              <div className="flex items-center gap-3">
                    <Checkbox 
                        isChecked={isCompleted}
                        onChange={handleToggleComplete}
                        colorScheme="green"
                        size="lg"
                    />
                    <Heading size={"md"} className={isCompleted ? 'text-gray-500' : ''}>
                        {title}
                    </Heading>
                </div>
            </CardHeader>
            <Divider borderColor={"grey"}></Divider>
            <CardBody>
              <Text className={isCompleted ? 'text-gray-500' : ''}>
                {description}
              </Text>
              {dueDate && (
                <div className="mt-3">
                  <Text fontSize="sm" className={isCompleted ? 'text-gray-400' : 'text-gray-600'}>
                    <strong>🧮 Срок выполнения:</strong> {moment(dueDate).format("DD/MM/YYYY HH:mm")}
                    {!isCompleted && getDueDateStatus() === 'overdue' && (
                      <span className="ml-2">🚨 ПРОСРОЧЕНО!</span>
                    )}
                    {!isCompleted && getDueDateStatus() === 'urgent' && (
                      <span className="ml-2">⚠️ СРОЧНО!</span>
                    )}
                  </Text>
                </div>
              )}
            </CardBody>
            <Divider borderColor={"grey"}></Divider>
            <CardFooter className={isCompleted ? 'text-gray-400 flex justify-between items-center' : 'text-gray-600 flex justify-between items-cente'}>{moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}
               <div className="flex gap-2">
                    <Button colorScheme='blue' size="sm" onClick={handleEdit}>
                        Редактировать
                    </Button>
                    <Button colorScheme='red' size="sm" onClick={handleDelete}>
                        Удалить
                    </Button>
                </div>
            </CardFooter>
            </div>
        </Card>
    );
 }