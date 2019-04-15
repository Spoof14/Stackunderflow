
class Api{
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL
    }
    
    async getPosts(){
        let res = await fetch(`${this.baseUrl}/post/list`)
        return await res.json()
    }
}

export default Api;