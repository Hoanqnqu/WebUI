/** File */

export const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}

/** Create */

export const createUserFormData = (values: any) => {
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("firstName", values.firstName)
    formData.append("lastName", values.lastName)
    formData.append("phoneNumber", values.phoneNumber)
    formData.append("role", values.role)
    if (values.photo) formData.append("photo", values.photo[0].originFileObj)
    if (values.password) formData.append("password", values.password)

    return formData
}

export const createMyInfoFormData = (values: any) => {
    const formData = new FormData()
    formData.append("firstName", values.firstName)
    formData.append("lastName", values.lastName)
    formData.append("phoneNumber", values.phoneNumber)
    if (values.photo) formData.append("photo", values.photo[0].originFileObj)

    return formData
}

export const createUtilityFormData = (values: any) => {
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("note", values.note)

    return formData
}

/** Convert */

export const convertAddress = (roomblock: any) => {
    return roomblock.address + " | " + roomblock.district + ", " + roomblock.city
}

export function convertDate(date: any) {
    if (!date) return ""

    const originalDate = new Date(date)

    const year = originalDate.getFullYear()
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0")
    const day = originalDate.getDate().toString().padStart(2, "0")

    const formattedDateString = [year, month, day].join("-")

    return formattedDateString
}

/** Format */

export function formatStatus(status?: string): string {
    if (!status) return ""
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

export const formatPrice = (number: any) => {
    const price = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return price ? `${price} VND` : ""
}

export const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

/** Style */

export const styleOrEmpty = (condition: boolean, style: string) => (condition ? style : "")

/** Get */
export const getCityAndCountry = async (lat: number, lon: number) => {
    return new Promise((resolve, reject) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=vi`)
            .then((res) => res.json())
            .then((data) => {
                resolve(data.address)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
