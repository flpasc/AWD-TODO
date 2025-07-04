import { TaskProps } from '@/types/TaskProps'

export async function completedTask(taskId: string): Promise<TaskProps> {
	return await fetch(`/api/tasks/${taskId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({}),
	}).then((res) => res.json())
}
