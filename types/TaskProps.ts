export type TaskProps = {
	id: string
	_id: string
	title: string
	completed: boolean
}

export type TaskListProps = {
	tasks: TaskProps[]
}
