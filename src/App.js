import React from 'react';
import Layout from "./hoc/Layout/Layout";
import Authorization from "./containers/Authorization/Authorization";

function App() {
    return (
        <div className="App">
            <Layout>
                <Authorization>

                </Authorization>
            </Layout>
        </div>
    );
}

export default App;
