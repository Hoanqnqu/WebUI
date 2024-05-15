import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { store } from "./redux/store.ts"
import { Provider } from "react-redux"
import { ConfigProvider } from "antd"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#e36414"
                    }
                }}
            >
                <App />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
)
