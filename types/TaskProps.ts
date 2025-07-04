export type TaskProps = {
	_id: string
	title: string
	completed: boolean
}

export type TaskListProps = {
	tasks: TaskProps[]
}
