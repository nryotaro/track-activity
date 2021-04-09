import { IncomingMessage, ServerResponse } from 'http';



export default function handler(req, res) {
    //res.status(200).json({ name: 'John Doe' });
    console.log(req.cookies);
    res.writeHead(302, { Location: '/vercel.svg' });
    res.end();
}