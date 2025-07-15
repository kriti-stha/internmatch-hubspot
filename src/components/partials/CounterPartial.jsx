import { Island } from "@hubspot/cms-components";
import CounterButton from "../islands/CounterButton.jsx?island";
import Layout from "../Layout.jsx";

const defaultCount = 0;

function CounterPartial() {

  return (
    <Layout>
        <h2>My Counter Button</h2>
        {/* <CounterButton defaultCount={defaultCount}/> */}
        <Island module={CounterButton} defaultCount={defaultCount} />
    </Layout>
  );
}

export default CounterPartial;