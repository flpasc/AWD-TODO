import { TaskProps } from './TaskProps'

export type TaskStoreProps = {
	funMode: boolean
	setupMode: boolean
	finishSetup: () => void
	activeList: string | null
	setActiveList: (newList: string | null) => void
	searchTerm: string
	setSearchTerm: (term: string | undefined) => void
	toggleFunMode: () => void
	countingTasks: TaskProps[]
	setCountingTasks: (newCountingTask: TaskProps[]) => void
	countCompletedTasks: number
	countActiveTasks: number
	setCountCompletedTasks: () => void
	setActiveTasks: () => void
}
