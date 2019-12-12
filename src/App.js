import React from 'react';
import Layout from "./hoc/Layout/Layout";
import Authorization from "./containers/Authorization/Authorization";
import DragWishes from "./containers/DragWishes/DragWishes";

function App() {
    return (
        <div className="App">
            <Layout>
                {/*<Authorization>*/}
                {/*</Authorization>*/}
                <DragWishes>

                </DragWishes>
            </Layout>
        </div>
    );
}

export default App;
