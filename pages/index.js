import Head from 'next/head';
import EntryComponent from '../components/EntryComponent';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Smart Object Detection</title>
      </Head>
      <EntryComponent />
    </div>
  );
}
