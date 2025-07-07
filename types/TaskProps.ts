export type TaskProps = {
	_id: string
	title: string
	completed: boolean
	created_at?: Date
	updated_at?: Date
}

export type TaskListProps = {
	tasks: TaskProps[]
}
