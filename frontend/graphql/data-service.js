export async function GetData(query) {
    const token = localStorage.getItem("jwt");
    if (!token) {
        return [null, new Error("No JWT token found in LocalStorage.")]
    }
    const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({query})
    });

    const result = await response.json();
    if (!response.ok || result.errors) {
        console.error("GraphQL error:", JSON.stringify(result.errors, null, 2))
        return [null, new Error("Failed to fetch data from GraphQL API.")]
    }

    return [result.data, null]
}
