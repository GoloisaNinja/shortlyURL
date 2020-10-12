const reset = function initialState() {
    return {
        slug: '',
        url: '',
        existsorerror: null,
        respUrl: null,
        respSlug: null,
        outcome: null,
    }
}

const app = new Vue({
    el: '#app',
    data: function() {
        return reset()
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
                this.respUrl = null
                this.respSlug = null
                this.outcome = null
                this.existsorerror = 'url required - entered url\nwas empty or bad...'
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


