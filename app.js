const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());

app.get("/path/*", (req, res) => {
  const urlParams = req.params[0];
  let root = {
    type: "dir",
    children: {
      home: {
        type: "dir",
        children: {
          myname: {
            type: "dir",
            children: {
              "filea.txt": {
                type: "file",
              },
              "fileb.txt": {
                type: "file",
              },
              projects: {
                type: "dir",
                children: {
                  mysupersecretproject: {
                    type: "dir",
                    children: {
                      mysupersecretfile: {
                        type: "file",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      office: {
        type: "dir",
        children: {
          "office.txt": {
            type: "file",
          },
        },
      },
    },
  };

  let url = urlParams.split("/");
  let path = root.children;

  const getVal = (obj) => {
    for (let k in obj) {
      if (obj[k] === "dir") return obj.children;
      return obj[k];
    }
  };

  const getChild = () => {
    if (url.length === 1 && url[0] === "root") {
      return root.children;
    } else {
      for (let i = 1; i < url.length; i++) {
        path = getVal(path[url[i]]);
      }
      return path;
    }
  };

  var a = getChild();
  if (a) {
    Object.keys(a).forEach((x) => {
      if (a[x].type === "dir") {
        delete a[x].children;
      }
    });
  } else {
    return res.status(500).json({ error: "server error" });
  }

  return res.status(200).json(a).end();
});
app.listen(5000, () => console.log("listening on 5000"));
