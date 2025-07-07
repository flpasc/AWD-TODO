import {
	Checkbox,
	ListItem,
	UnorderedList,
	IconButton,
	Spacer,
	HStack,
	Input,
	Divider,
	Flex,
	useToast,
	Editable,
	EditableInput,
	EditablePreview,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteTask } from '../Task/Functions/deleteTask'
import { editTask } from '../Task/Functions/editTask'
import { completedTask } from '../Task/Functions/completedTask'
import { useSWRConfig } from 'swr'
import { useTaskStore } from '@/store'
import JSConfetti from 'js-confetti'
import { TaskProps, TaskListProps } from '@/types/TaskProps'

export default function TaskList({ tasks }: TaskListProps) {
	const toast = useToast()
	const { mutate } = useSWRConfig()
	const funMode = useTaskStore<boolean>((state) => state.funMode)
	const confetti = new JSConfetti()
	const searchTerm = useTaskStore<string>((state) => state.searchTerm)

	const filteredTasks = tasks.filter((task: TaskProps) =>
		task.title.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleDeleteTask = async (taskId: string): Promise<void> => {
		try {
			await deleteTask(taskId)
			mutate('/api/tasks')

			toast({
				title: 'Task deleted',
				status: 'warning',
				duration: 5000,
				isClosable: true,
			})
		} catch (error) {
			mutate('/api/tasks')

			if (error instanceof Error) {
				toast({
					title: 'Error deleting task',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				})
			} else {
				toast({
					title: 'Error deleting task',
					description: 'Unexpected error occured',
					status: 'error',
					duration: 5000,
					isClosable: true,
				})
			}
		}
	}
	const handleEditTask = async (
		taskId: string,
		nextValue: string,
	): Promise<void> => {
		try {
			mutate<TaskListProps>(
				'/api/tasks',
				(data) => {
					if (!data) return { tasks: [] }

					return {
						tasks: data.tasks.map((task) =>
							task._id === taskId ? { ...task, title: nextValue } : task,
						),
					}
				},
				true,
			)
			await editTask(taskId, nextValue)

			mutate('/api/tasks')
		} catch (error) {
			mutate('/api/tasks')
		}
	}

	const handleCompletedTask = async (taskId: string): Promise<void> => {
		try {
			const task: TaskProps = await completedTask(taskId)
			if (task.completed) {
				if (funMode) {
					confetti.addConfetti({
						emojis: ['🌈', '🐻', '✏️', '✅', '🥳', '🎉', '🦄', '🐻', '🐼'],
						emojiSize: 150,
						confettiRadius: 100,
					})
				} else {
					toast({
						title: 'Task Done',
						status: 'success',
						duration: 5000,
						isClosable: true,
					})
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				toast({
					title: 'Error completing task',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				})
			} else {
				toast({
					title: 'Error completing task',
					description: 'Unexpected error ocured',
					status: 'error',
					duration: 5000,
					isClosable: true,
				})
			}
		} finally {
			mutate('/api/tasks')
		}
	}

	return (
		<UnorderedList
			styleType='none'
			spacing={2}
			marginTop={5}
		>
			{filteredTasks.map((task) => (
				<ListItem key={task._id}>
					<Flex alignItems='center'>
						<HStack spacing='12px'>
							<Checkbox
								colorScheme='teal'
								onChange={() => handleCompletedTask(task._id)}
								defaultChecked={false}
								onBlur={() => {}}
								checked={!!task.completed}
							/>

							<Editable
								defaultValue={task.title}
								onSubmit={(nextValue) => handleEditTask(task._id, nextValue)}
							>
								<EditablePreview as={task.completed ? 'del' : 'span'} />
								<Input
									as={EditableInput}
									focusBorderColor='teal.400'
									size='sm'
								/>
							</Editable>
						</HStack>
						<Spacer />
						<IconButton
							aria-label='Delete a task'
							size='xs'
							color='red.300'
							margin='10px'
							icon={<DeleteIcon />}
							onClick={() => handleDeleteTask(task._id)}
						/>
					</Flex>
					<Divider />
				</ListItem>
			))}
		</UnorderedList>
	)
}
