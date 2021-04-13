import { GetServerSideProps, } from 'next';
import nookies from 'nookies';

export default function TrackImage(props: {}) {
    return <></>;
}

export const getServerSideProps = async context => {
    const cookies = nookies.get(context);
    console.log('cookies: ', JSON.stringify(cookies));

    nookies.set(context, 'test', new Date().toString(), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    })
    context.res.writeHead(302, { Location: '/vercel.svg' });
    context.res.end();
    return { props: {} };
}