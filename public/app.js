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
		page: 1,
		totalpages: null,
		newsearch: true,
		about: false,
	};
};

const app = new Vue({
	el: '#app',
	data: function () {
		return reset();
	},
	methods: {
		topofPage() {
			const gohere = document.querySelector('#topOfPage');
			gohere.scrollIntoView({ behavior: 'smooth' });
		},
		copyToClipboard() {
			const urlEl = document.getElementById('urlLink');
			const urlDataToCopy = urlEl.dataset.route;
			const clipboardBtn = document.getElementById('clipboardBtn');
			navigator.clipboard.writeText(urlDataToCopy).then(() => {
				clipboardBtn.innerHTML = 'copied!';
			});
		},
		scrollToAbout() {
			const gohere = document.querySelector('#myAboutDiv');
			gohere.scrollIntoView({ behavior: 'smooth' });
		},
		async showAbout() {
			this.about = !this.about;
			const check = await this.about;
			if (check) {
				this.scrollToAbout();
			} else {
				this.topofPage();
			}
		},
		async createUrl() {
			const response = await fetch('/url', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					slug: this.slug,
					url: this.url,
				}),
			});
			const serverResp = await response.json();
			if (serverResp.msg) {
				this.respUrl = null;
				this.respSlug = null;
				this.outcome = null;
				serverResp.msg.includes('Slug')
					? (this.existsorerror = serverResp.msg)
					: (this.existsorerror =
							'valid url required - \nentered url was bad or empty');
			} else {
				this.existsorerror = null;
				this.respUrl = serverResp.url;
				this.respSlug = serverResp.slug;
				this.outcome = 'Success!';
			}

			this.slug = '';
			this.url = '';
			const clipboardBtn = document.getElementById('clipboardBtn');
			clipboardBtn.innerHTML = 'copy url';
		},
		async search() {
			if (this.newsearch) {
				this.page = 1;
			}
			const response = await fetch(
				`/api/search?searchfor=${this.searchfor}&page=${this.page}`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application.json',
					},
				}
			);
			const serverResp = await response.json();
			console.log(serverResp);
			if (serverResp.msg) {
				this.searchOutcome = serverResp.msg;
				this.matches = [];
				this.page = 1;
				this.totalpages = null;
			} else {
				this.searchOutcome = 'Success!';
				this.matches = serverResp.urlmatches;
				this.totalpages = serverResp.pages;
				this.searchfor = '';
			}
			console.log(this.newsearch);
		},
		nextPage() {
			this.page += 1;
			this.newsearch = false;
			this.search();
		},
		prevPage() {
			if (this.page > 1) {
				this.page -= 1;
				this.newsearch = false;
				this.search();
			}
		},
	},
});
