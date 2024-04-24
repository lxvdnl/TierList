const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const port = 3000;
const hostName = "localhost";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname + "/public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/", function (req, res) {
  const allTierListsInfo = getSubfoldersNameAndImgNames("./public/imgSets");
  res.render("homePage.html", {
    allTierListsInfo: allTierListsInfo,
  });
});

app.get("/help", function (req, res) {
  res.render("help.html");
});

app.get("/createTierList", function (req, res) {
  res.render("createTierList.html", {
    buttonVisible: false,
    tierListName: "",
  });
});

app.get("/tierList", function (req, res) {
  let tierListName = req.query.tierListName;
  const allTierListsInfo = getSubfoldersNameAndImgNames("./public/imgSets");
  if (!allTierListsInfo.some((item) => item.fileName == tierListName)) {
    res.redirect("/");
  } else res.render("tierList.html", { tierListName: tierListName });
});

app.post("/tierListCreated", upload.array("imgSet"), function (req, res) {
  let tierListName = req.body.tierListName;
  let imgSet = req.files;

  const tierListDirectory = path.join(
    __dirname,
    "public",
    "imgSets",
    tierListName,
  );
  if (!fs.existsSync(tierListDirectory)) {
    fs.mkdirSync(tierListDirectory, { recursive: true });
  }
  imgSet.forEach((file, index) => {
    const oldPath = file.path;
    const extension = path.extname(file.originalname);
    const newName = `img${index + 1}${extension}`;
    const newPath = path.join(tierListDirectory, newName);

    fs.renameSync(oldPath, newPath);
  });

  res.render("createTierList.html", {
    buttonVisible: true,
    tierListName: tierListName,
  });
});

app.listen(port, hostName, (err) => {
  if (err) {
    console.error("Error when starting the server: ", err);
    process.exit(1);
  }
  console.log(`The server is running on http://${hostName}:${port}`);
});

function getSubfoldersNameAndImgNames(path) {
  const subfolders = [];

  fs.readdirSync(path).forEach((file) => {
    const filePath = path + "/" + file;
    const isFolder = fs.statSync(filePath).isDirectory();

    if (isFolder) {
      const fileNametmp = file;
      const imgNamesTmp = [];

      fs.readdirSync(filePath).forEach((img) => {
        const imgPath = filePath + "/" + img;
        const isImg = fs.statSync(imgPath).isFile();

        if (
          isImg &&
          (img.split(".").pop() === "jpeg" ||
            img.split(".").pop() === "jpg" ||
            img.split(".").pop() === "png")
        ) {
          imgNamesTmp.push(img);
        }
      });

      subfolders.push({
        fileName: fileNametmp,
        imgNames: imgNamesTmp,
      });
    }
  });

  return subfolders;
}
