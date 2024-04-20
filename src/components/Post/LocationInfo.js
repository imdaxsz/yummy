import Component from "@components";

export default class LocationInfo extends Component {
  template() {
    const { locationInfo: {id, address, placeName} } = this.props;
    return `
      <a
        href='${`https://map.kakao.com/link/map/${id}`}' 
        class='flex items-center gap-8 mt-80 border px-8 py-12 
              rounded-lg shadow-sm border-zinc-200 tap-highlight'
      >
        <i class='ph-fill ph-map-pin text-28 block text-primary'></i>
        <div class='flex-1 min-w-0'>
          <p class='font-medium truncate text-14 leading-tight'>${placeName}</p>
          <p class='text-zinc-400 truncate text-12'>${address}</p>
        </div>
      </a>
    `;
  }
}