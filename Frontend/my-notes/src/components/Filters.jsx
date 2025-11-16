import { Input, Select} from '@chakra-ui/react';

export default function Filters({filter, setFilter}){
    return(
        <div className="flex flex-col gap-5">
            <Input placeholder="Поиск"
                   onChange={(e) => setFilter({...filter, search: e.target.value})}
            />
            <Select onChange={(e) => setFilter({...filter, sortOrder: e.target.value})}>
                <option value={"desc"}>Сначала новые</option>
                <option value={"asc"}>Сначала старые</option>
            </Select>

            <Select 
                value={filter.status || "all"}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
                >
                <option value="all">Все задачи</option>
                <option value="active">Только активные</option>
                <option value="completed">Только выполненные</option>
            </Select>
        </div>
    );
}