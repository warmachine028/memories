export const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
		reader.readAsDataURL(file)
	})
}

export const getThumbnail = (url) => url.replace('/upload/', '/upload/q_10/')

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
