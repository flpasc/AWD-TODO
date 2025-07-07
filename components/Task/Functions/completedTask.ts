import { TaskProps } from '@/types/TaskProps'

export async function completedTask(taskId: string): Promise<TaskProps> {
	try {
		const response = await fetch(`/api/tasks/${taskId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		})

		if (!response.ok) {
			throw new Error('Failed to complete task:')
		}

		const data: TaskProps = await response.json()
		return data
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error completeTask:', error.message)
		} else {
			console.error('Unexpected error: ', error)
		}
		throw error
	}
}
