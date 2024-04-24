import Component from "@components";

export default class PlaceLocation extends Component {
  template() {
    const { placeName, address } = this.props;
    return `
      <div class='flex-1 min-w-0 flex items-center gap-4'>
        <i class='ph-fill ph-map-pin text-28 block text-primary'></i>
        <div class='flex-1 min-w-0 pr-8'>
          <p class='font-medium truncate'>${placeName}</p>
          <p class='text-14 text-zinc-400 truncate'>${address}</p>
        </div>
      </div>
      <button id='removeLocation' aria-label='위치 정보 삭제' class='shrink-0'>
        <i class='ph ph-x text-20 block'></i>
      </button>
    `;
  }
}