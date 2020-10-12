
const app = new Vue({
    el: '#app',
    data: function() {
        return initialState()
    },
    methods: {
        async createUrl() {
            console.log(this.slug, this.url)
            const response = await fetch('/url', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    slug: this.slug,
                    url: this.url,
                })
            })
            const serverResp = await response.json()
            if(serverResp.msg) {
                this.existsorerror = serverResp.msg
            } else {
                this.existsorerror = null
                this.respUrl = serverResp.url
                this.respSlug = serverResp.slug
                this.outcome = 'Success!'
            }

            this.slug = ''
            this.url = ''
    
        }
    }
})

function initialState() {
    return {
        slug: '',
        url: '',
        existsorerror: null,
        respUrl: null,
        respSlug: null,
        outcome: null,
    }
}
