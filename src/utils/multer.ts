import * as multer from "multer";
import * as path from "path";
import * as uuid from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + uuid.v4() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage: storage });
