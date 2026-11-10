import { About } from "./components/About";
import { BagDrawer } from "./components/BagDrawer";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Library } from "./components/Library";
import { Nav } from "./components/Nav";
import { Newsletter } from "./components/Newsletter";
import { PreviewModal } from "./components/PreviewModal";
import { SeasonPass } from "./components/SeasonPass";
import { Toasts } from "./components/Toasts";
import { StoreProvider } from "./store";

export default function App() {
  return (
    <StoreProvider>
      <a href="#library" className="skip-link">
        Skip to the library
      </a>
      <Nav />
      <main>
        <Hero />
        <Library />
        <SeasonPass />
        <About />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
      <BagDrawer />
      <PreviewModal />
      <Toasts />
    </StoreProvider>
  );
}
