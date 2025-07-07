export async function deleteTask(taskId: string): Promise<void> {
	try {
		const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })

		if (!response.ok) {
			throw new Error('Error deleting Task')
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error deleteTask: ', error.message)
		} else {
			console.error('Unexpected error: ', error)
		}
	}
}
