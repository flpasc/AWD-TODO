import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { TaskStoreProps } from './types/TastStoreProps'

export const useTaskStore = create<TaskStoreProps>()(
	persist(
		(set, get) => ({
			funMode: false,
			setupMode: true,
			finishSetup: () => set({ setupMode: false }),
			activeList: null,
			setActiveList: (newActiveList) => set({ activeList: newActiveList }),
			searchTerm: '',
			setSearchTerm: (newSearchTerm) => set({ searchTerm: newSearchTerm }),
			toggleFunMode: () =>
				set((state) => ({
					funMode: !state.funMode,
				})),
			countingTasks: [],
			setCountingTasks: (newCountingTasks) =>
				set({ countingTasks: newCountingTasks }),
			countCompletedTasks: 0,
			countActiveTasks: 0,

			setCountCompletedTasks: (): void => {
				const countingTasks = get().countingTasks
				const count = countingTasks.reduce(
					(count, task) => (task.completed ? count + 1 : count),
					0,
				)
				set({ countCompletedTasks: count })
			},

			setActiveTasks: (): void => {
				const countingTasks = get().countingTasks
				const countCompleted = countingTasks.reduce(
					(count, task) => (task.completed ? count + 1 : count),
					0,
				)
				const active = countingTasks.length - countCompleted
				set({ countActiveTasks: active })
			},
		}),

		{
			name: 'task-tango-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
)
