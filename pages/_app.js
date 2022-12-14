import StoreProvider from "../store/store-context";
import "../styles/globals.css";
StoreProvider;

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}

export default MyApp;
