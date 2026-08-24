import { createAppShell } from "./App";
import AAIG from "./components/tabs/AAIG";
import AppRoutesSSG from "./routes/AppRoutes.ssg";

const AppSSG = createAppShell(AAIG, AppRoutesSSG);

export default AppSSG;
