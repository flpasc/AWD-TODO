import mongoose, { Mongoose } from 'mongoose'

const uri = process.env.MONGODB_URI

if (!uri) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local',
	)
}

const MONGODB_URI: string = uri

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
	// QUESTION: why does let not work?
	var mongoose: {
		promise: Promise<Mongoose> | null
		conn: Mongoose | null
	}
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect(): Promise<Mongoose> {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose
		})
	}

	try {
		cached.conn = await cached.promise
	} catch (e) {
		cached.promise = null
		throw e
	}

	return cached.conn
}

export default dbConnect
