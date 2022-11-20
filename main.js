const drawToCanvas = (data) => {
  drawImage(data, (canvas, image) => {
    window.rawImage = image;
    filterImage(canvas, image);
  });
};

const handleUploadFile = () => {
  const input = e(".t-upload");
  input.addEventListener(
    "change",
    (event) => {
      const file = event.target.files[0];
      // 过滤文件
      if (!file.type.includes("image")) {
        alert("请确保文件为图像类型");
        return false;
      }
      const reader = new FileReader();
      // 转化成base64数据类型
      reader.readAsDataURL(file);
      reader.onload = () => {
        drawToCanvas(reader.result);
      };
    },
    false
  );
};

const saveAsPNG = () => {
  const canvas = e(".t-canvas");
  // log('canvas', canvas)
  return canvas.toDataURL("image/png");
};

const handleSaveFile = () => {
  const input = e(".t-save-btn");
  input.addEventListener("click", (event) => {
    let a = document.createElement("a");
    a.download = "avatar";
    a.href = saveAsPNG();
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
};

const handleSelectSize = () => {
  const select = e(".t-select-size");
  select.addEventListener("change", (event) => {
    let v = event.target.value;
    e(".t-select-size").dataset.size = v;
    window.cellSize = Number(v);
    if (window.rawImage) {
      const canvas = e(".t-canvas");
      filterImage(canvas, rawImage);
    }
  });
};

const init = () => {
  const url = "https://grammyli.com/t/avatar/img/empty.29426768.png";
  const c = e(".t-canvas");
  const context = c.getContext("2d");
  c.width = width;
  c.height = width;
  const img = new Image();
  img.setAttribute("crossorigin", "anonymous");
  img.src = url;
  img.onload = () => {
    context.drawImage(img, 0, 0, width, width);
  };
};

const handleEvents = () => {
  // 上传文件
  handleUploadFile();
  // 下载文件
  handleSaveFile();
  handleSelectSize();
};

const __main = () => {
  window.width = 300;
  window.cellSize = 1;
  init();
  handleEvents();
};

__main();
