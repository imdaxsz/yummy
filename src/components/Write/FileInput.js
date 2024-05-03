import Component from '@components';
import optimizeImageFile from '@libs/compress';

export default class FileInput extends Component {
  template() {
    return `
      <label
        for='fileInput'
        class='h-112 rounded-lg bg-neutral-200 flex-center flex-col gap-2
          text-neutral-500 cursor-pointer'>
        <h3 class='flex-center gap-4 font-medium'>
          <i class='ph ph-image text-24'></i>
          사진 추가
        </h3>
        <span class='text-12'>최대 4장까지 업로드 가능</span>
      </label>
      <input
        id='fileInput'
        type='file'
        class='hidden'
        multiple
        accept='.gif, .jpg, .jpeg, .webp, .png'
      />
    `;
  }

  async onChangeAttachments(e) {
    const { updateAttachments } = this.props;
    const attachments = [];
    const { files } = e.target;

    if (files.length === 0) {
      return;
    }
    
    if (files.length > 4) {
      alert('이미지는 최대 4장까지 첨부할 수 있어요!');
      return;
    }

    const limitsize = 1024 ** 2 * 5;
    await Promise.all(
      Array.from(files).map(async (file) => {
        if (limitsize < file.size) {
          alert('5MB 이하의 이미지만 첨부할 수 있어요!');
          return;
        }
        const optimizedFile = await optimizeImageFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(optimizedFile);

        await new Promise((resolve, reject) => {
          reader.onload = (readerEvent) => {
            attachments.push(readerEvent.target.result);
            resolve();
          };
          reader.onerror = reject;
        });
      }),
    );

    updateAttachments(attachments);
  }

  setEvent() {
    this.addEvent(
      'change',
      'input[type="file"]',
      this.onChangeAttachments.bind(this),
    );
  }
}
