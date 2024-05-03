const importSwipper = async () => {
  const Swiper = (await import('swiper')).default;
  const { Navigation, Scrollbar } = await import('swiper/modules');
  return { Swiper, Navigation, Scrollbar };
};

export default importSwipper;