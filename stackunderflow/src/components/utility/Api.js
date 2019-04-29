
class Api{
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL
    }

    
    
    async getPosts(){
        let res = await fetch(`${this.baseUrl}/post/list`)
        return await res.json()
    }

    async getPostById(id){
        let res = await fetch(`${this.baseUrl}/post/get/${id}`);
        return await res.json();
    }

    async newPost(title, user, question){
        return fetch(`${this.baseUrl}/post/new`, {
            method:'POST',
            headers: {
				"Content-Type": "application/json",
			},
            body: JSON.stringify({title, user, question})
        })
    }

    async vote(post, value, commentId){
        return fetch(`${this.baseUrl}/${commentId ? 'comment' : 'post'}/vote/${post}`, {
            method:'POST',
            headers: {
				"Content-Type": "application/json",
			},
            body: JSON.stringify({value, commentId})
        })
    }

    async answer(name, answer, id){
        return fetch(`${this.baseUrl}/comment/new/${id}`, {
            method:'POST',
            headers: {
				"Content-Type": "application/json",
			},
            body: JSON.stringify({name, answer})
        })
    }
}

export default Api;