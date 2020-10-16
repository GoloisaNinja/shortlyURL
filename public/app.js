
const reset = function initialState() {
    return {
        slug: '',
        url: '',
        existsorerror: null,
        respUrl: null,
        respSlug: null,
        outcome: null,
        searchfor: null,
        matches: [],
        searchOutcome: null,
    }
}

const app = new Vue({
    el: '#app',
    data: function() {
        return reset()
    },
    methods: {
        async createUrl() {
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
                serverResp.msg.includes('Slug') ?
                    this.existsorerror = serverResp.msg :
                    this.existsorerror = 'valid url required - \nentered url was bad or empty'
                
            } else {
                this.existsorerror = null
                this.respUrl = serverResp.url
                this.respSlug = serverResp.slug
                this.outcome = 'Success!'
            }

            this.slug = ''
            this.url = ''
    
        },
        async search() {
            const response = await fetch(`/search/${this.searchfor}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application.json',
                }
            })
            const serverResp = await response.json()
            console.log(serverResp)
            if(serverResp.msg) {
                this.searchOutcome = serverResp.msg
                this.matches = []
            } else {
                this.searchOutcome = 'Success!'
                this.matches = serverResp
            }

            this.searchfor = ''
        }
    }
})


