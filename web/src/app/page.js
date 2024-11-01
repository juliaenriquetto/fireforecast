// import dynamic from 'next/dynamic';

import Forecasting from "./forecast/page";

// const DynamicHome = dynamic(() => import('./components/home'), {
//   ssr: false
// });



export default function HomePage() {
  //alert("jhj")

  return <Forecasting/>

  //return <DynamicHome />;
}
