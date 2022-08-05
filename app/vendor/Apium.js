console.log('%cApium v1.2', 'font-size: 36px; background: linear-gradient(to right, #30CFD0 0%, #330867 100%); color: white;')

/**
 * API "Universal Messenger" (APIum)
 *
 * Processes HTTP requests/responses (http client)
 */
class Apium {
    /**
     * Constructs an instance of Apium
     * 
     * @param {string} baseUrl The base url to connect to
     */
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    /**
     * Performs an HTTP call to a server
     * 
     * @param {string} method The HTTP method (GET, POST, PATCH, PUT, DELETE, ...)
     * @param {string} urlOrPath The address of the server to connect to
     * @param {Object} options The required HTTP headers or body for the specific call
     *  
     * Example:
     * 
     * {
     *       headers: {
     *           Authorization: ...,
     *           'Content-Type': ...
     *       },
     *       body: ...
     *   }
     * @param {function} callback  The callback function that attends the response's result ({ status, payload})
     */
    call(method, urlOrPath, options, callback) {
        if (callback) {
            const xhr = new XMLHttpRequest

            xhr.addEventListener('load', event => {
                const { status, responseText: payload } = event.target

                callback(null, { status, payload })
            })

            xhr.addEventListener('error', () => {
                callback(new Error('API call fail'))
            })

            const url = urlOrPath.toLowerCase().startsWith('http://') || urlOrPath.toLowerCase().startsWith('https://') ? urlOrPath : `${this.baseUrl}/${urlOrPath}`

            xhr.open(method, url)

            if (options) {
                const { headers, body } = options

                if (headers)
                    for (const key in headers)
                        xhr.setRequestHeader(key, headers[key])

                xhr.send(body)
            } else xhr.send()
        } else return new Promise((resolve, reject) => {
            let xhr

            console.log('call to API')

            const callRecursive = (method, urlOrPath, options) => {
                xhr = new XMLHttpRequest

                console.log('call to API 2')

                xhr.addEventListener('load', event => {
                    const { status, responseText: payload } = event.target

                    console.log('req', method, url, options)
                    console.log('res', status, payload)

                    if (status === 404) {
                        const error = JSON.parse(payload)

                        if (typeof error === 'string' && error.includes('//www.herokucdn.com/error-pages/no-such-app.html')) {
                            console.log('call recursive used')
                            callRecursive(method, urlOrPath, options)
                        }
                    }

                    resolve({ status, payload })
                })

                xhr.addEventListener('error', error => {
                    console.log(error)

                    reject(new Error('API call fail'))
                })

                const url = urlOrPath.toLowerCase().startsWith('http://') || urlOrPath.toLowerCase().startsWith('https://') ? urlOrPath : `${this.baseUrl}/${urlOrPath}`
                console.log(url)
                xhr.open(method, url)

                if (options) {
                    const { headers, body } = options

                    if (headers)
                        for (const key in headers)
                            xhr.setRequestHeader(key, headers[key])

                    xhr.send(body)
                } else xhr.send()
            }

            callRecursive(method, urlOrPath, options)
        })
    }

    get(urlOrPath, options, callback) {
        return this.call('GET', urlOrPath, options, callback)
    }

    post(urlOrPath, options, callback) {
        return this.call('POST', urlOrPath, options, callback)
    }

    patch(urlOrPath, options, callback) {
        return this.call('PATCH', urlOrPath, options, callback)
    }

    put(urlOrPath, options, callback) {
        return this.call('PUT', urlOrPath, options, callback)
    }

    delete(urlOrPath, options, callback) {
        return this.call('DELETE', urlOrPath, options, callback)
    }

    options(urlOrPath, options, callback) {
        return this.call('OPTIONS', urlOrPath, options, callback)
    }
}

export default Apium