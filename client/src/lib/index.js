// Reusable function for API calls
export const handleApiCall = async (apiFunc, formData, thunkAPI) => {
	try {
		const response = await apiFunc(formData)
		return response.data || response
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
	}
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
