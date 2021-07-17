export async function postApi<T, B>(url: string, body: B): Promise<T> {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const jsonData = await res.json()

    if (!res.ok) {
        throw new Error(jsonData.message)
    }

    return jsonData
}