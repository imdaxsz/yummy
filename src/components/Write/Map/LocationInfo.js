import Component from '@components';

export default class LocationInfo extends Component {
  template() {
    const { placeName, address } = this.props;
    
    return `
      <div class='border-y border-zinc-200'>
        <div id='map_container' class='w-full h-240'>
          <div id='map'></div>
        </div>
        <div class='flex justify-between items-center p-12 '>
          <div class='flex-center gap-6'>
            <i class='ph-fill ph-map-pin text-24 text-[#238CFA]'></i>
            <div>
              <p class='font-semibold tracking-tight'>
                ${placeName ?? ''}
              </p>
              <p class='text-12 text-zinc-400'>
                ${address ?? ''}
              </p>
            </div>
          </div>
          <button 
            id='edit' 
            aria-label='수정' 
            class='px-4 text-zinc-500'
          >
            수정
          </button>
        </div>
      </div>
    `;
  }
}
