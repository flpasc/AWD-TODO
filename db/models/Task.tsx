import { TaskProps } from '@/types/TaskProps'
import mongoose, { Model } from 'mongoose'
const { Schema } = mongoose

const taskSchema = new Schema<TaskProps>(
	{
		title: { type: String, required: true },
		completed: { type: Boolean, required: true, default: false },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

const Task: Model<TaskProps> =
	mongoose.models.Task || mongoose.model<TaskProps>('Task', taskSchema)

export default Task
