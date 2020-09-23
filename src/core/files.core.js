import { useState } from "react";
import { Storage } from "./firebase.config";

const useFileUpload = () => {
  const [errors, setErrors] = useState([]);
  const [filesUrl, setFilesUrl] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState([]);

  const onUploadChange = (files, folder) => {
    // const { files } = e.target;
    if (files) {
      Promise.all(
        Object.values(files).map((file) => {
          setFileName([...fileName, file.name]);
          return new Promise((resolve, reject) => {
            const uploadTask = Storage.ref(`${folder}/${file.name}`).put(
              file.originFileObj
            );
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
              },
              (error) => {
                console.log(error);
                setErrors([...errors, error]);
                reject(error);
              },
              () => {
                Storage.ref(folder)
                  .child(file.name)
                  .getDownloadURL()
                  .then((url) => {
                    resolve(url);
                    setProgress(0);
                  });
              }
            );
          });
        })
      )
        .then((urls) => {
          console.log(urls);
          setFilesUrl([...filesUrl, ...urls]);
        })
        .catch((error) => {
          console.log("this error occurred:", error);
        });
    } else {
      setErrors([...errors, "Please select file(s)"]);
    }
  };

  const onFileDelete = (folder) => {
    let getUrlArray = [];
    console.log("this is the file name array :", fileName);
    Promise.all(
      fileName.map(
        (name) =>
          new Promise((resolve, reject) => {
            Storage.ref(`${folder}/${name}`)
              .getDownloadURL()
              .then((url) => resolve(url))
              .catch((err) => reject(err));
          })
      )
    )
      .then((urls) => {
        getUrlArray.push(urls);
        console.log("this is the url array from file name:", getUrlArray);
        getUrlArray.map((value, index) => {
          const remainUrl = filesUrl.filter((url) => {
            if (url !== value) {
              return false;
            }
            return true;
          });
          console.log("this is the url array from file name:", remainUrl);
          setFilesUrl([...remainUrl]);

          const deleteRef = Storage.ref(`${folder}/${fileName[index]}`);

          // Delete the file
          deleteRef
            .delete()
            .then(() => {
              // File deleted successfully
              const restOfFileName = fileName.filter((value, array) => {
                if (value !== array[index]) {
                  return false;
                }
                return true;
              });
              console.log(
                "this is the url array from file name:",
                restOfFileName
              );
              setFileName([...restOfFileName]);
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
              console.log(error);
              setErrors([...errors, error]);
            });
          return { fileName, filesUrl };
        });
      })
      .catch((error) => console.log(error));
  };

  return { onUploadChange, onFileDelete, progress, filesUrl, errors };
};

export default useFileUpload;
