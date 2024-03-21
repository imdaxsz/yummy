import Component from '@components';
import LocationInfo from './LocationInfo';

export default class Map extends Component {
  map; // 지도
  ps; // 검색 객체
  geocoder; // 주소-좌표 변환 객체
  userLocation; // 사용자 현재 위치 객체 (사용자 위치 중심으로 검색)
  $input; // 검색 input
  $locationInfo; // 내가 선택한 장소의 정보

  constructor($target, props) {
    super($target, props);
    this.init();
  }

  setup() {
    this.state = { locationInfo: { id: '', address: '', placeName: '' } };
  }

  template() {
    const { id } = this.state.locationInfo;
    return `
        <div class='map_wrap'>
          <div class='flex items-center justify-between h-60 px-8'>
            <button id='cancel' class='px-8' aria-label='취소'>취소</button>
            <button id='add' class='px-8' aria-label='추가'>추가</button>
          </div>
          <form id='search'>
            <input type='text' placeholder='장소명을 입력하세요.' value='' id='keyword'>
            <button type='submit'>
              <i class='ph ph-magnifying-glass text-zinc-400 text-24 block'></i>
            </button>
          </form>
          <div id='menu_wrap'>
            <ul id='placesList'></ul>
            <div id='pagination' class='flex-center'></div>
          </div>
          ${id ? `<div id='location_info'></div>` : ``}
        </div>
    `;
  }

  init(id) {
    if (id) {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 26.570667),
        level: 3,
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.geocoder = new kakao.maps.services.Geocoder();
    } else {
      this.$input = document.getElementById('keyword');
      this.$input.focus({ preventScroll: true });
    } 
    this.ps = new kakao.maps.services.Places();
    this.getUserLocation();
  }

  didMount() {
    const { id, placeName, address } = this.state.locationInfo;
    if (id) {
      const $locationInfo = document.getElementById('location_info');
      new LocationInfo($locationInfo, {
        placeName,
        address,
      });
    }
    this.init(id);
  }

  setEvent() {
    const { toggleMapModal } = this.props;

    this.addEvent('submit', '#search', (e) => {
      e.preventDefault();
      this.searchPlaces();
    });
    this.addEvent('click', '#cancel', toggleMapModal);
    this.addEvent('click', '#edit', () => {
      this.setState({
        ...this.state,
        locationInfo: { id: '', address: '', placeName: '' },
      });
    });
    this.addEvent('click', '#add', this.addLocation.bind(this));
  }

  // 사용자 현재 위치 받는 함수
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.userLocation = new kakao.maps.LatLng(lat, lon);
      });
    } else {
      this.userLocation = new kakao.maps.LatLng(37.554678, 126.970606);
    }
  }

  // 위치 첨부
  addLocation() {
    const { id, placeName, address } = this.state.locationInfo;
    const { setLocation, toggleMapModal } = this.props;
    toggleMapModal();
    setTimeout(() => setLocation(id, address, placeName), 150);
  }

  // 키워드 검색 요청
  searchPlaces() {
    const keyword = this.$input.value;
    this.$input.blur();
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('장소명을 입력해 주세요!');
      return false;
    }
    // 장소 검색 객체를 통한 키워드로 장소 검색 요청
    this.ps.keywordSearch(keyword, this.placesSearchCB.bind(this), {
      location: this.userLocation,
    });
  }

  // 장소 검색이 완료됐을 때 호출되는 콜백함수
  placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 검색 성공 시 검색 목록 렌더링
      this.displayPlaces(data);
      // 페이지 번호 렌더링
      this.displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }

  // 검색 결과 목록 렌더링 함수
  displayPlaces(places) {
    const listEl = document.getElementById('placesList');
    const menuEl = document.getElementById('menu_wrap');
    const fragment = document.createDocumentFragment();

    // 검색 결과 목록에 추가된 항목들을 제거
    this.removeAllChildNods(listEl);

    for (var i = 0; i < places.length; i++) {
      const itemEl = this.getListItem(places[i]); // 검색 결과 항목 Element 생성
      const { id, road_address_name, place_name } = places[i];

      // 검색 결과 항목 클릭 시 지도 및 장소 정보 출력
      ((address, place_name) => {
        itemEl.onclick = () => {
          this.setState({
            ...this.state,
            locationInfo: { id, address, placeName: place_name },
          });
          this.geocoder.addressSearch(address, this.addressSearchCB.bind(this));
        };
      })(road_address_name, place_name);

      fragment.appendChild(itemEl);
    }

    // 검색 결과 항목들을 검색결과 목록 Element에 추가
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
  }

  // 검색 결과 항목을 Element로 반환하는 함수
  getListItem(places) {
    const el = document.createElement('li');
    let itemStr =
      '<div class="info">' + '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
      itemStr +=
        '    <span>' +
        places.road_address_name +
        '</span>' +
        '   <span class="jibun gray">' +
        places.address_name +
        '</span>';
    } else {
      itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
  }

  // 검색결과 목록 하단 페이지 번호 렌더링 함수
  displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');
    const fragment = document.createDocumentFragment();

    // 기존에 추가된 페이지 번호 삭제
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (var i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.addEventListener(
          'click',
          (function (i) {
            return function (e) {
              e.preventDefault();
              pagination.gotoPage(i);
            };
          })(i),
        );
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수
  removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

  // 특정 주소의 좌표 검색 후 해당 위치로 지도 중심을 이동시키는 함수
  addressSearchCB(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치 마커로 표시
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: coords,
      });

      // 인포윈도우로 장소명 표시
      const { placeName } = this.state.locationInfo;
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div class='info_window__content'>${placeName}</div>`,
      });
      infowindow.open(this.map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동
      this.map.setCenter(coords);
    }
  }
}
