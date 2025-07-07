export async function editTask(
	taskId: string,
	taskTitle: string,
): Promise<void> {
	try {
		const response = await fetch(`/api/tasks/${taskId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: taskTitle }),
		})
		if (!response.ok) {
			throw new Error('Error editTask')
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error editTask: ', error.message)
		} else {
			console.error('Unexpected error: ', error)
		}
	}
}
