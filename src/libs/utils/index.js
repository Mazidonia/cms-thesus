export function safeSSRCall(call, fallback) {
  // istanbul ignore next
  if (typeof window === "undefined") {
    return fallback;
  }
  return call();
}

export const ROWS_PER_PAGE = 20;
export const PAGE = 1;

//https://github.com/sideway/joi/blob/master/lib/types/string.js#L688
export const ERROR_STRING_MSG = {
  "string.base": `กรุณากรอกข้อมูล`,
  "string.empty": `กรุณากรอกข้อมูล`,
  "any.required": `กรุณากรอกข้อมูล`,
  "string.min": "กรุณากรอกข้อมูลให้ถูกต้อง",
  "string.max": "กรุณากรอกข้อมูลให้ถูกต้อง",
};

//https://github.com/sideway/joi/blob/master/lib/types/number.js
export const ERROR_NUMBER_MSG = {
  "number.base": `กรุณากรอกตัวเลข`,
  "any.required": `กรุณากรอกข้อมูล`,
  "number.max": "ต้องมากกว่า {{#limit}}",
  "number.min": "ต้องมากกว่า {{#limit}}",
  "number.greater": "ต้องมากกว่า {{#limit}}",
  "number.less": "ต้องน้อยกว่า {{#limit}}",
};

// messages: {
//   'number.base': '{{#label}} must be a number',
//   'number.greater': '{{#label}} must be greater than {{#limit}}',
//   'number.infinity': '{{#label}} cannot be infinity',
//   'number.integer': '{{#label}} must be an integer',
//   'number.less': '{{#label}} must be less than {{#limit}}',
//   'number.max': '{{#label}} must be less than or equal to {{#limit}}',
//   'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
//   'number.multiple': '{{#label}} must be a multiple of {{#multiple}}',
//   'number.negative': '{{#label}} must be a negative number',
//   'number.port': '{{#label}} must be a valid port',
//   'number.positive': '{{#label}} must be a positive number',
//   'number.precision': '{{#label}} must have no more than {{#limit}} decimal places',
//   'number.unsafe': '{{#label}} must be a safe number'
// }

export function getFileInfo(files) {
  if (!files || files.length === 0) {
    return { fileName: null, fileType: null };
  }

  const name = files.name;
  const lastDot = name.lastIndexOf(".");
  const fileName = name.substring(0, lastDot);
  const fileType = name.substring(lastDot + 1);

  return {
    fileName: fileName,
    fileType: fileType,
    fullName: files.name,
    fileSize: files.size,
  };
}

export function getFileUploadData(fileList) {
  return new Promise((resolve, reject) => {
    if (fileList === null)
      resolve({
        file_base64: null,
        file_name: null,
        file_size: null,
        type_type: null,
      });
    const file = Array.from(fileList)[0];

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const res_base64 = reader.result;
      resolve({
        file_base64: res_base64.replace("data:", "").replace(/^.+,/, ""),
        file_name: file.name,
        file_size: file.size,
        type_type: file.type,
      });
    });
    reader.addEventListener("error", (error) => reject(error));
    reader.readAsDataURL(file);
  });
}

export function pdfTriggerDownload(base64) {
  if (!base64) {
    return;
  }
  const byteCharacters = window.atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new Blob([byteArray], { type: "application/pdf;base64" });
  const fileURL = URL.createObjectURL(file);
  const windowPrint = window.open(fileURL);
  windowPrint?.focus();
  //windowPrint?.print();
}

export function detectMimeType(base64) {
  const signatures = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg",
  };
  for (var s in signatures) {
    if (base64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}

export function triggerDownload(base64) {
  if (!base64) {
    return;
  }
  const byteCharacters = window.atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new Blob([byteArray], {
    type: `${detectMimeType(base64)};base64`,
  });
  const fileURL = URL.createObjectURL(file);
  const windowPrint = window.open(fileURL);
  windowPrint?.focus();
}

//https://stackoverflow.com/questions/72103664/node-js-download-locally-docx-or-pdf-encoded-as-base64-string
