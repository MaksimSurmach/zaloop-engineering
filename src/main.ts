import '@fontsource-variable/archivo/index.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/animations.css';
import { setupAnalytics } from './scripts/analytics';
import { setupEntrance } from './scripts/animations';
import { setupLocalization } from './scripts/localization';
import { setupNavigation } from './scripts/navigation';

document.documentElement.classList.replace('no-js', 'js');
setupNavigation();
setupLocalization();
setupEntrance();
setupAnalytics();
