export default async function AddTask(taskTitle: string): Promise<void> {
	console.log(taskTitle)
	try {
		const response = await fetch(`/api/tasks`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(taskTitle),
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error('AddTask error: ', error.message)
		} else {
			console.error('Unkown error: ', error)
		}
	}
}
