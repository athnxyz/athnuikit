import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { 
  faChartBar,
  faCheckCircle,
  faCircle,
  faClose,
  faSliders,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';


class FontAwesomeLoader {
  load() {
    const iconList = [
      faChartBar,
      faCheckCircle,
      faCircle,
      faClose,
      faSliders,
      faToggleOff,
      faToggleOn,
    ];

    library.add(...iconList);
    dom.watch();
  }
}

new FontAwesomeLoader().load();
export default FontAwesomeIcon;