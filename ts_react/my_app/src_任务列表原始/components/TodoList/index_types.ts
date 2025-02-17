// 定义单个待办事项的类型
export interface TodoItem {
    id: string | number;
    title: string;
    completed: boolean;
}

export type SelectType = "all" | "true" | "false"


// 定义TodoList组件的props类型
export interface TodoListProps {
    items?: TodoItem[];
    selectType?: SelectType;
    onAdd?: (item: TodoItem) => void;
    onDelete?: (id: string | number | (string | number)[]) => void;
    onToggle?: (id: string | number) => void;
    onSelect?: (completed: SelectType) => void;
    setSelectType?: (selectType: SelectType) => void;
}