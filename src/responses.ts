export class JSONResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(JSON.stringify(body), init)
        this.headers.set("Content-Type", "application/json")
    }
}

export class HTMLResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(String(body), init)
        this.headers.set("Content-Type", "text/html;charset=utf-8")
    }
}

export class PlainTextResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        super(String(body), init)
        this.headers.set("Content-Type", "text/plain;charset=utf-8")
    }
}
