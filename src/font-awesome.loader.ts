import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { 
  faToggleOn,
  faDice,
  faMoneyBillWave,
  faHouse,
  faChartBar,
  faToggleOff,
  faCircle,
  faSliders,
  faClose
} from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';


class FontAwesomeLoader {
  load() {
    const iconList = [
      faToggleOn,
      faDice,
      faMoneyBillWave,
      faBitcoin,
      faHouse,
      faChartBar,
      faToggleOff,
      faCircle,
      faSliders,
      faClose
    ];

    library.add(...iconList);
    dom.watch();
  }
}

new FontAwesomeLoader().load();
export default FontAwesomeIcon;